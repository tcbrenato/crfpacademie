'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, ThumbsUp, Users, Search, Plus, X, Send } from 'lucide-react'

const categories = ['Tous', 'Marketing', 'Finance', 'Ressources', 'Temoignage', 'Questions', 'Technologie']

export default function CommunautePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [categorieActive, setCategorieActive] = useState('Tous')
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ titre: '', contenu: '', categorie: 'Questions' })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
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

  const handleLike = async (postId) => {
    if (!user) return
    try {
      const res = await fetch('/api/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId }),
      })
      const data = await res.json()
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: data.likes } : p))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmitPost = async () => {
    if (!form.titre || !form.contenu) return
    if (!user) { window.location.href = '/login'; return }
    setSaving(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user_id: user.id, likes: 0 }),
      })
      if (res.ok) {
        setShowForm(false)
        setForm({ titre: '', contenu: '', categorie: 'Questions' })
        fetchPosts()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const postsFiltres = posts.filter(p =>
    p.titre.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* HERO */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Communaute</h1>
            <p className="text-red-100">Echangez, apprenez et grandissez ensemble</p>
          </div>
          {user && (
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity" style={{ backgroundColor: '#ffffff', color: '#96121c' }}>
              <Plus size={18} />
              Nouvelle discussion
            </button>
          )}
        </div>
      </div>

      {/* MODAL NOUVEAU POST */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>Nouvelle discussion</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={20} style={{ color: '#6c757d' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Titre *</label>
                <input
                  type="text"
                  placeholder="Titre de votre discussion"
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Categorie *</label>
                <select
                  value={form.categorie}
                  onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }}
                >
                  {categories.filter(c => c !== 'Tous').map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Contenu *</label>
                <textarea
                  placeholder="Partagez vos idees, questions ou experiences..."
                  value={form.contenu}
                  onChange={(e) => setForm({ ...form, contenu: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none"
                  style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleSubmitPost} disabled={saving} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: saving ? 0.7 : 1 }}>
                  <Send size={16} />
                  {saving ? 'Publication...' : 'Publier'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors" style={{ color: '#6c757d' }}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: 'Membres actifs', value: '500+' },
            { icon: MessageSquare, label: 'Discussions', value: posts.length },
            { icon: ThumbsUp, label: 'Interactions', value: posts.reduce((acc, p) => acc + (p.likes || 0), 0) },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="rounded-xl p-5 flex items-center gap-4 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#96121c10' }}>
                <Icon size={22} style={{ color: '#96121c' }} />
              </div>
              <div>
                <p className="font-bold text-xl" style={{ color: '#1a1a2e' }}>{value}</p>
                <p className="text-sm" style={{ color: '#6c757d' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Categories</h3>
              <div className="space-y-1">
                {categories.map((cat, i) => (
                  <button key={i} onClick={() => setCategorieActive(cat)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: categorieActive === cat ? '#96121c' : 'transparent', color: categorieActive === cat ? '#fff' : '#6c757d' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {!user && (
              <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#1a1a2e' }}>Rejoindre la communaute</h3>
                <p className="text-xs mb-4" style={{ color: '#6c757d' }}>Connectez-vous pour participer aux discussions</p>
                <Link href="/login" className="block text-center text-sm font-semibold py-2 rounded-lg hover:opacity-90" style={{ backgroundColor: '#96121c', color: '#fff' }}>
                  Se connecter
                </Link>
              </div>
            )}

            {user && (
              <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
                <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Mon activite</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                    {user.nom?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{user.nom}</p>
                    <p className="text-xs" style={{ color: '#9b8e56' }}>{user.points || 0} points</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* POSTS */}
          <div className="md:col-span-3 space-y-4">

            {/* SEARCH */}
            <div className="relative mb-2">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Rechercher une discussion..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none text-sm bg-white"
                style={{ border: '1px solid #e9ecef', color: '#1a1a2e' }}
              />
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl h-40 animate-pulse bg-white" style={{ border: '1px solid #e9ecef' }} />
                ))}
              </div>
            ) : postsFiltres.length === 0 ? (
              <div className="rounded-xl p-12 text-center bg-white" style={{ border: '1px solid #e9ecef' }}>
                <MessageSquare size={48} className="mx-auto mb-4" style={{ color: '#e9ecef' }} />
                <p className="font-semibold mb-2" style={{ color: '#1a1a2e' }}>Aucune discussion pour le moment</p>
                <p className="text-sm mb-6" style={{ color: '#6c757d' }}>Soyez le premier a lancer une discussion</p>
                {user ? (
                  <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-xl" style={{ backgroundColor: '#96121c' }}>
                    <Plus size={16} />
                    Creer une discussion
                  </button>
                ) : (
                  <Link href="/login" className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-xl" style={{ backgroundColor: '#96121c' }}>
                    Se connecter pour participer
                  </Link>
                )}
              </div>
            ) : (
              postsFiltres.map((post) => (
                <div key={post.id} className="rounded-xl p-6 bg-white hover:shadow-md transition-all" style={{ border: '1px solid #e9ecef' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                        {post.users?.nom?.charAt(0) || 'M'}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{post.users?.nom || 'Membre'}</p>
                        <p className="text-xs" style={{ color: '#6c757d' }}>{post.users?.role || 'Membre'} · {new Date(post.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>
                      {post.categorie}
                    </span>
                  </div>

                  <Link href={`/communaute/${post.id}`}>
                    <h3 className="font-bold text-lg mb-2 hover:opacity-80 transition-opacity" style={{ color: '#1a1a2e' }}>{post.titre}</h3>
                  </Link>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#6c757d' }}>{post.contenu}</p>

                  <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>
                    <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#6c757d' }}>
                      <ThumbsUp size={16} />
                      <span>{post.likes || 0}</span>
                    </button>
                    <Link href={`/communaute/${post.id}`} className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#6c757d' }}>
                      <MessageSquare size={16} />
                      <span>Commenter</span>
                    </Link>
                    <span className="text-xs ml-auto" style={{ color: '#9ca3af' }}>
                      {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
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