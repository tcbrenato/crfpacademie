import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorie = searchParams.get('categorie')
    const niveau = searchParams.get('niveau')
    const gratuit = searchParams.get('gratuit')

    let query = supabase.from('cours').select('*').order('created_at', { ascending: false })

    if (categorie && categorie !== 'Tous') {
      query = query.eq('categorie', categorie)
    }
    if (niveau && niveau !== 'Tous niveaux') {
      query = query.eq('niveau', niveau)
    }
    if (gratuit === 'true') {
      query = query.eq('gratuit', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des cours' }, { status: 500 })
    }

    return NextResponse.json({ cours: data })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('cours')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la création du cours' }, { status: 500 })
    }

    return NextResponse.json({ cours: data }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}