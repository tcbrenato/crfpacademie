import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { nom, email, telephone, motDePasse, profil } = await request.json()

    console.log('Données reçues:', { nom, email, telephone, profil })

    // Vérifier si l'email existe déjà
    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    console.log('Recherche user:', { existingUser, searchError })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10)

    // Créer l'utilisateur
    const { data, error } = await supabase
      .from('users')
      .insert([{
        nom,
        email,
        telephone,
        mot_de_passe: hashedPassword,
        profil,
        role: 'membre',
        points: 0,
        niveau: 1,
      }])
      .select()
      .single()

    console.log('Création user:', { data, error })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Compte créé avec succès',
      user: {
        id: data.id,
        nom: data.nom,
        email: data.email,
        role: data.role,
      }
    }, { status: 201 })

  } catch (err) {
    console.log('Erreur catch:', err.message)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}