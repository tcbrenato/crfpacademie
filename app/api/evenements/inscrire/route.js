import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { evenement_id, user_id } = await request.json()

    if (!evenement_id || !user_id) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // Vérifier si déjà inscrit
    const { data: existing } = await supabase
      .from('inscriptions_evenements')
      .select('id')
      .eq('evenement_id', evenement_id)
      .eq('user_id', user_id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Vous etes deja inscrit' }, { status: 400 })
    }

    // Inscrire l'utilisateur
    const { error: inscriptionError } = await supabase
      .from('inscriptions_evenements')
      .insert([{ evenement_id, user_id }])

    if (inscriptionError) {
      return NextResponse.json({ error: 'Erreur inscription' }, { status: 500 })
    }

    // Incrementer le nombre d'inscrits
    const { data: evenement } = await supabase
      .from('evenements')
      .select('inscrits')
      .eq('id', evenement_id)
      .single()

    await supabase
      .from('evenements')
      .update({ inscrits: (evenement?.inscrits || 0) + 1 })
      .eq('id', evenement_id)

    // Ajouter des points à l'utilisateur
    const { data: userData } = await supabase
      .from('users')
      .select('points')
      .eq('id', user_id)
      .single()

    if (userData) {
      await supabase
        .from('users')
        .update({ points: userData.points + 15 })
        .eq('id', user_id)
    }

    return NextResponse.json({ message: 'Inscription reussie' }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}