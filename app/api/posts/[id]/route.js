import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
  try {
    const { id } = params

    const { data: post, error } = await supabase
      .from('posts')
      .select(`*, users(nom, role, avatar)`)
      .eq('id', id)
      .single()

    if (error) return NextResponse.json({ error: 'Post introuvable' }, { status: 404 })

    const { data: commentaires } = await supabase
      .from('commentaires')
      .select(`*, users(nom, role, avatar)`)
      .eq('post_id', id)
      .order('created_at', { ascending: true })

    return NextResponse.json({ post, commentaires: commentaires || [] })

  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 })
    return NextResponse.json({ message: 'Post supprime' })
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}