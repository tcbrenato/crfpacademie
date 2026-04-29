'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Calendar, ShoppingBag, TrendingUp, ChevronRight, Star, MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [cours, setCours] = useState([])
  const [posts, setPosts] = useState([])
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [coursRes, postsRes, evRes] = await Promise.all([
        fetch('/api/cours'),
        fetch('/api/posts'),
        fetch('/api/evenements'),
      ])
      const coursData = await coursRes.json()
      const postsData = await postsRes.json()
      const evData = await evRes.json()
      setCours(coursData.cours?.slice(0, 3) || [])
      setPosts(postsData.posts?.slice(0, 2) || [])
      setEvenements(evData.evenements?.slice(0, 2) || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* BIENVENUE */}
        <div className="rounded-2xl p-8 mb-8 flex items-center justify-between" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Bonjour, {user.nom}</h1>
            <p className="text-gray-400">Bienvenue sur votre espace de formation CRFP Academie</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#96121c25' }}>
                  <Star size={16} style={{ color: '#96121c' }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{user.points || 0} pts</p>
                  <p className="text-gray-500 text-xs">Points</p>
                </div>
              </div>
              <div style={{ width: 1, height: 30, backgroundColor: '#333' }} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9b8e5625' }}>
                  <TrendingUp size={16} style={{ color: '#9b8e56' }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Niveau {user.niveau || 1}</p>
                  <p className="text-gray-500 text-xs">Votre niveau</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/cours" className="hidden md:flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
            Voir les formations
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* STATS RAPIDES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Formations', value: cours.length, color: '#96121c', href: '/cours' },
            { icon: MessageSquare, label: 'Communaute', value: posts.length, color: '#9b8e56', href: '/communaute' },
            { icon: Calendar, label: 'Evenements', value: evenements.length, color: '#96121c', href: '/evenements' },
            { icon: ShoppingBag, label: 'Marketplace', value: '0', color: '#9b8e56', href: '/marketplace' },
          ].map(({ icon: Icon, label, value, color, href }, i) => (
            <Link href={href} key={i} className="rounded-xl p-5 flex items-center gap-4 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}25` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* COLONNE PRINCIPALE */}
          <div className="md:col-span-2 space-y-8">

            {/* FORMATIONS */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} style={{ color: '#96121c' }} />
                  <h2 className="text-white font-bold text-lg">Formations disponibles</h2>
                </div>
                <Link href="/cours" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />)}
                </div>
              ) : cours.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Aucune formation disponible pour le moment</p>
                  <Link href="/cours" className="text-xs font-semibold mt-2 inline-block" style={{ color: '#9b8e56' }}>Voir le catalogue</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cours.map((c, i) => (
                    <div key={i} className="p-4 rounded-lg flex items-center justify-between" style={{ backgroundColor: '#1a1a1a' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c25' }}>
                          <BookOpen size={18} style={{ color: '#96121c' }} />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{c.titre}</p>
                          <p className="text-gray-500 text-xs">{c.categorie} — {c.niveau} — {c.duree}</p>
                        </div>
                      </div>
                      <Link href="/cours" className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90" style={{ backgroundColor: '#96121c', color: '#fff' }}>
                        Acceder
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DISCUSSIONS */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} style={{ color: '#9b8e56' }} />
                  <h2 className="text-white font-bold text-lg">Discussions recentes</h2>
                </div>
                <Link href="/communaute" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />)}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">Aucune discussion pour le moment</p>
                  <Link href="/communaute" className="text-xs font-semibold mt-2 inline-block" style={{ color: '#9b8e56' }}>Rejoindre la communaute</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                        {post.users?.nom?.charAt(0) || 'M'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm mb-1">{post.titre}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-xs">{post.users?.nom || 'Membre'}</span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#9b8e56' }}>
                            <Star size={11} />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="space-y-6">

            {/* EVENEMENTS */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar size={18} style={{ color: '#9b8e56' }} />
                  <h2 className="text-white font-bold">Evenements a venir</h2>
                </div>
                <Link href="/evenements" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />)}
                </div>
              ) : evenements.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">Aucun evenement prevu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {evenements.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                      <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                        <span className="text-white font-bold text-sm leading-none">{new Date(ev.date).getDate()}</span>
                        <span className="text-red-200 text-xs">{new Date(ev.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold leading-tight">{ev.titre}</p>
                        <p className="text-gray-500 text-xs mt-1">{ev.heure}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MON PROFIL */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <h2 className="text-white font-bold mb-4">Mon profil</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                  {user.nom?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold">{user.nom}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                  <span className="text-xs px-2 py-1 rounded mt-1 inline-block" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>
                    {user.role === 'admin' ? 'Administrateur' : 'Membre'}
                  </span>
                </div>
              </div>
              <Link href="/profil" className="block text-center text-sm font-semibold py-2 rounded-lg hover:opacity-90 mb-2" style={{ backgroundColor: '#1a1a1a', color: '#9b8e56' }}>
                Voir mon profil complet
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="block text-center text-sm font-semibold py-2 rounded-lg hover:opacity-90" style={{ backgroundColor: '#96121c', color: '#fff' }}>
                  Panneau Admin
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}