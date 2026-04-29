import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorie = searchParams.get('categorie')

    let query = supabase
      .from('posts')
      .select(`*, users(nom, role, avatar)`)
      .order('created_at', { ascending: false })

    if (categorie && categorie !== 'Tous') {
      query = query.eq('categorie', categorie)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des posts' }, { status: 500 })
    }

    return NextResponse.json({ posts: data })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('posts')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la création du post' }, { status: 500 })
    }

    return NextResponse.json({ post: data }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}