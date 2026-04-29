'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, ThumbsUp, Users, Search, Plus } from 'lucide-react'

const categories = ['Tous', 'Marketing', 'Finance', 'Ressources', 'Temoignage', 'Questions', 'Technologie']

export default function CommunautePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [categorieActive, setCategorieActive] = useState('Tous')

  useEffect(() => {
    fetchPosts()
  }, [categorieActive])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categorieActive !== 'Tous') params.append('categorie', categorieActive)
      const res = await fetch(`/api/posts?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const postsFiltres = posts.filter(p =>
    p.titre.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-red-100 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#ffffff20' }}>
                <span className="text-white font-bold text-sm">CRF</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">CRFP</span>
                <span style={{ color: '#f0e8c8' }} className="font-bold text-lg"> Academie</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-red-100 hover:text-white text-sm font-medium px-4 py-2">Connexion</Link>
            <Link href="/register" className="text-sm font-semibold px-5 py-2 rounded-lg" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Communaute</h1>
          <p className="text-red-100 text-lg">Echangez, apprenez et grandissez ensemble</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: 'Membres actifs', value: posts.length > 0 ? '500+' : '0' },
            { icon: MessageSquare, label: 'Discussions', value: posts.length },
            { icon: ThumbsUp, label: 'Interactions', value: posts.reduce((acc, p) => acc + p.likes, 0) },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="rounded-xl p-5 flex items-center gap-4" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#96121c25' }}>
                <Icon size={22} style={{ color: '#96121c' }} />
              </div>
              <div>
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-xl p-5" style={{ backgroundColor: '#0D0D0D' }}>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <button key={i} onClick={() => setCategorieActive(cat)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: categorieActive === cat ? '#96121c' : '#1a1a1a', color: categorieActive === cat ? '#fff' : '#9ca3af' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* POSTS */}
          <div className="md:col-span-3 space-y-4">

            {/* SEARCH + BOUTON */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une discussion..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl outline-none text-sm"
                  style={{ backgroundColor: '#0D0D0D', color: '#fff', border: '1px solid #333' }}
                />
              </div>
              <Link href="/login" className="flex items-center gap-2 text-white font-semibold px-5 py-3 rounded-xl flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                <Plus size={18} />
                Nouvelle discussion
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl h-40 animate-pulse" style={{ backgroundColor: '#0D0D0D' }} />
                ))}
              </div>
            ) : postsFiltres.length === 0 ? (
              <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
                <MessageSquare size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
                <p className="text-gray-400 font-semibold">Aucune discussion pour le moment</p>
                <p className="text-gray-600 text-sm mt-2">Soyez le premier a lancer une discussion</p>
                <Link href="/login" className="inline-flex items-center gap-2 mt-4 text-white text-sm font-semibold px-6 py-3 rounded-lg" style={{ backgroundColor: '#96121c' }}>
                  <Plus size={16} />
                  Creer une discussion
                </Link>
              </div>
            ) : (
              postsFiltres.map((post) => (
                <div key={post.id} className="rounded-xl p-6 hover:shadow-lg transition-shadow" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                        {post.users?.nom?.charAt(0) || 'M'}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{post.users?.nom || 'Membre'}</p>
                        <p className="text-gray-500 text-xs">{post.users?.role || 'Membre'} · {new Date(post.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>
                      {post.categorie}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{post.titre}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.contenu}</p>
                  <div className="flex items-center gap-6 pt-3" style={{ borderTop: '1px solid #1a1a1a' }}>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                      <ThumbsUp size={16} />
                      {post.likes} J aime
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                      <MessageSquare size={16} />
                      Commenter
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}