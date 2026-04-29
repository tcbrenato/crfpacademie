import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('evenements')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des événements' }, { status: 500 })
    }

    return NextResponse.json({ evenements: data })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('evenements')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la création de l\'événement' }, { status: 500 })
    }

    return NextResponse.json({ evenement: data }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}