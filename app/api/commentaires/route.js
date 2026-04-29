import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { contenu, user_id, post_id } = await request.json()

    if (!contenu || !user_id || !post_id) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('commentaires')
      .insert([{ contenu, user_id, post_id }])
      .select(`*, users(nom, role, avatar)`)
      .single()

    if (error) return NextResponse.json({ error: 'Erreur commentaire' }, { status: 500 })

    // Ajouter des points à l'utilisateur
    const { data: userData } = await supabase
      .from('users')
      .select('points')
      .eq('id', user_id)
      .single()

    if (userData) {
      await supabase
        .from('users')
        .update({ points: userData.points + 5 })
        .eq('id', user_id)
    }

    return NextResponse.json({ commentaire: data }, { status: 201 })

  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}