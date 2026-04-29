import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [
      { count: totalMembres },
      { count: totalCours },
      { count: totalPosts },
      { count: totalEvenements },
      { count: totalProduits },
      { count: totalInscriptions },
      { data: recentMembres },
      { data: topPosts },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('cours').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('evenements').select('*', { count: 'exact', head: true }),
      supabase.from('produits').select('*', { count: 'exact', head: true }),
      supabase.from('inscriptions').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('id, nom, email, role, profil, points, niveau, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('posts').select('id, titre, likes, categorie, created_at, users(nom)').order('likes', { ascending: false }).limit(5),
    ])

    return NextResponse.json({
      stats: {
        totalMembres: totalMembres || 0,
        totalCours: totalCours || 0,
        totalPosts: totalPosts || 0,
        totalEvenements: totalEvenements || 0,
        totalProduits: totalProduits || 0,
        totalInscriptions: totalInscriptions || 0,
      },
      recentMembres: recentMembres || [],
      topPosts: topPosts || [],
    })

  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}