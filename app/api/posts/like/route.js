import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { post_id } = await request.json()

    const { data: post } = await supabase
      .from('posts')
      .select('likes')
      .eq('id', post_id)
      .single()

    if (!post) return NextResponse.json({ error: 'Post introuvable' }, { status: 404 })

    const { data, error } = await supabase
      .from('posts')
      .update({ likes: post.likes + 1 })
      .eq('id', post_id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: 'Erreur like' }, { status: 500 })

    return NextResponse.json({ likes: data.likes })

  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}