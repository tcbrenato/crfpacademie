'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Users, Award, Calendar, ShoppingBag, TrendingUp, ChevronRight, Star, MessageSquare } from 'lucide-react'
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
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* BIENVENUE */}
        <div className="rounded-2xl p-8 mb-8 flex items-center justify-between bg-white" style={{ border: '1px solid #e9ecef' }}>
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1a1a2e' }}>Bonjour, {user.nom}</h1>
            <p style={{ color: '#6c757d' }}>Bienvenue sur votre espace de formation CRFP Academie</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#96121c15' }}>
                  <Star size={16} style={{ color: '#96121c' }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1a1a2e' }}>{user.points || 0} pts</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>Points</p>
                </div>
              </div>
              <div style={{ width: 1, height: 30, backgroundColor: '#e9ecef' }} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9b8e5615' }}>
                  <TrendingUp size={16} style={{ color: '#9b8e56' }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1a1a2e' }}>Niveau {user.niveau || 1}</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>Votre niveau</p>
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
            { icon: Users, label: 'Communaute', value: posts.length, color: '#9b8e56', href: '/communaute' },
            { icon: Calendar, label: 'Evenements', value: evenements.length, color: '#96121c', href: '/evenements' },
            { icon: ShoppingBag, label: 'Marketplace', value: '0', color: '#9b8e56', href: '/marketplace' },
          ].map(({ icon: Icon, label, value, color, href }, i) => (
            <Link href={href} key={i} className="rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-all bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-xl" style={{ color: '#1a1a2e' }}>{value}</p>
                <p className="text-xs" style={{ color: '#6c757d' }}>{label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* COLONNE PRINCIPALE */}
          <div className="md:col-span-2 space-y-8">

            {/* FORMATIONS */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} style={{ color: '#96121c' }} />
                  <h2 className="font-bold text-lg" style={{ color: '#1a1a2e' }}>Formations disponibles</h2>
                </div>
                <Link href="/cours" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: '#f8f9fa' }} />)}
                </div>
              ) : cours.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: '#6c757d' }}>Aucune formation disponible</p>
                  <Link href="/cours" className="text-xs font-semibold mt-2 inline-block" style={{ color: '#9b8e56' }}>Voir le catalogue</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cours.map((c, i) => (
                    <div key={i} className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c15' }}>
                          <BookOpen size={18} style={{ color: '#96121c' }} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{c.titre}</p>
                          <p className="text-xs" style={{ color: '#6c757d' }}>{c.categorie} — {c.niveau} — {c.duree}</p>
                        </div>
                      </div>
                      <Link href={`/cours/${c.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 text-white" style={{ backgroundColor: '#96121c' }}>
                        Acceder
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DISCUSSIONS */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} style={{ color: '#9b8e56' }} />
                  <h2 className="font-bold text-lg" style={{ color: '#1a1a2e' }}>Discussions recentes</h2>
                </div>
                <Link href="/communaute" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1,2].map(i => <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: '#f8f9fa' }} />)}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: '#6c757d' }}>Aucune discussion pour le moment</p>
                  <Link href="/communaute" className="text-xs font-semibold mt-2 inline-block" style={{ color: '#9b8e56' }}>Rejoindre la communaute</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post, i) => (
                    <Link href={`/communaute/${post.id}`} key={i}>
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:shadow-sm transition-all" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                          {post.users?.nom?.charAt(0) || 'M'}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm mb-1" style={{ color: '#1a1a2e' }}>{post.titre}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs" style={{ color: '#6c757d' }}>{post.users?.nom || 'Membre'}</span>
                            <span className="flex items-center gap-1 text-xs" style={{ color: '#9b8e56' }}>
                              <Star size={11} />{post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="space-y-6">

            {/* EVENEMENTS */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar size={18} style={{ color: '#9b8e56' }} />
                  <h2 className="font-bold" style={{ color: '#1a1a2e' }}>Evenements a venir</h2>
                </div>
                <Link href="/evenements" className="text-xs font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>Voir tout</Link>
              </div>
              {evenements.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm" style={{ color: '#6c757d' }}>Aucun evenement prevu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {evenements.map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                      <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                        <span className="text-white font-bold text-sm leading-none">{new Date(ev.date).getDate()}</span>
                        <span className="text-red-200 text-xs">{new Date(ev.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-xs leading-tight" style={{ color: '#1a1a2e' }}>{ev.titre}</p>
                        <p className="text-xs mt-1" style={{ color: '#6c757d' }}>{ev.heure}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MON PROFIL */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Mon profil</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                  {user.nom?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#1a1a2e' }}>{user.nom}</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>{user.email}</p>
                  <span className="text-xs px-2 py-1 rounded mt-1 inline-block" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>
                    {user.role === 'admin' ? 'Administrateur' : 'Membre'}
                  </span>
                </div>
              </div>
              <Link href="/profil" className="block text-center text-sm font-semibold py-2 rounded-lg hover:opacity-90 mb-2" style={{ backgroundColor: '#f8f9fa', color: '#9b8e56', border: '1px solid #e9ecef' }}>
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