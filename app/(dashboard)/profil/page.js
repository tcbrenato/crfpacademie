'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Award, TrendingUp, Star, CheckCircle, Clock, Edit, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function MessageSquare2({ size, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function ProfilPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [inscriptions, setInscriptions] = useState([])
  const [posts, setPosts] = useState([])
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [editForm, setEditForm] = useState({ nom: '', prenom: '', telephone: '', fonction: '', entreprise: '', bio: '', ville: '' })
  const [editSaving, setEditSaving] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) { router.push('/login'); return }
    const u = JSON.parse(stored)
    setUser(u)
    fetchUserData(u.id)
  }, [])

  const fetchUserData = async (userId) => {
    setLoading(true)
    try {
      const { data: userData } = await supabase
        .from('users').select('*').eq('id', userId).single()

      const { data: inscriptionsData } = await supabase
        .from('inscriptions').select('*, cours(titre, categorie, duree)').eq('user_id', userId)

      const { data: postsData } = await supabase
        .from('posts').select('*').eq('user_id', userId).order('created_at', { ascending: false })

      const { data: badgesData } = await supabase
        .from('user_badges').select('*, badge(titre, description, couleur)').eq('user_id', userId)

      setUserData(userData)
      setInscriptions(inscriptionsData || [])
      setPosts(postsData || [])
      setBadges(badgesData || [])

      if (userData) {
        localStorage.setItem('user', JSON.stringify({
          ...JSON.parse(localStorage.getItem('user')),
          points: userData.points,
          niveau: userData.niveau,
        }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editForm.nom) return
    setEditSaving(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          nom: editForm.nom,
          prenom: editForm.prenom,
          telephone: editForm.telephone,
          fonction: editForm.fonction,
          entreprise: editForm.entreprise,
          bio: editForm.bio,
          ville: editForm.ville,
        })
        .eq('id', user.id)

      if (!error) {
        setUserData({ ...userData, ...editForm })
        const stored = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({ ...stored, nom: editForm.nom }))
        setShowEdit(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setEditSaving(false)
    }
  }

  const getNiveau = (points) => {
    if (points < 100) return { niveau: 1, label: 'Debutant', next: 100 }
    if (points < 300) return { niveau: 2, label: 'Apprenti', next: 300 }
    if (points < 600) return { niveau: 3, label: 'Confirme', next: 600 }
    if (points < 1000) return { niveau: 4, label: 'Expert', next: 1000 }
    return { niveau: 5, label: 'Master', next: 1000 }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 animate-spin mx-auto mb-4" style={{ borderColor: '#96121c', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: '#6c757d' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  const niveauInfo = getNiveau(userData?.points || 0)
  const progression = Math.min(((userData?.points || 0) / niveauInfo.next) * 100, 100)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* MODAL EDIT */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>Modifier mon profil</h2>
                <button onClick={() => setShowEdit(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} style={{ color: '#6c757d' }} />
                </button>
              </div>

              {/* AVATAR */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#96121c' }}>
                    {editForm.nom?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9b8e56' }}>
                    <Edit size={12} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Prenom</label>
                    <input type="text" value={editForm.prenom} onChange={(e) => setEditForm({ ...editForm, prenom: e.target.value })} placeholder="Votre prenom" className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Nom *</label>
                    <input type="text" value={editForm.nom} onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })} placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Telephone</label>
                  <input type="tel" value={editForm.telephone} onChange={(e) => setEditForm({ ...editForm, telephone: e.target.value })} placeholder="+229 XX XX XX XX" className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Fonction / Poste</label>
                  <input type="text" value={editForm.fonction} onChange={(e) => setEditForm({ ...editForm, fonction: e.target.value })} placeholder="Ex: Directeur Marketing, Etudiant..." className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Entreprise / Organisation</label>
                  <input type="text" value={editForm.entreprise} onChange={(e) => setEditForm({ ...editForm, entreprise: e.target.value })} placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Biographie</label>
                  <textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} placeholder="Parlez-nous de vous en quelques mots..." rows={3} className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#1a1a2e' }}>Ville / Pays</label>
                  <input type="text" value={editForm.ville} onChange={(e) => setEditForm({ ...editForm, ville: e.target.value })} placeholder="Ex: Cotonou, Benin" className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', color: '#1a1a2e' }} />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button onClick={handleSaveEdit} disabled={editSaving} className="flex-1 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: editSaving ? 0.7 : 1 }}>
                    {editSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                  <button onClick={() => setShowEdit(false)} className="px-6 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO PROFIL */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0" style={{ backgroundColor: '#ffffff30', border: '3px solid #9b8e56' }}>
              {userData?.nom?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{userData?.prenom ? `${userData.prenom} ${userData.nom}` : userData?.nom}</h1>
              {userData?.fonction && <p className="text-red-200 text-sm mb-1">{userData.fonction} {userData.entreprise ? `— ${userData.entreprise}` : ''}</p>}
              <p className="text-red-100 mb-2">{userData?.email}</p>
              {userData?.ville && <p className="text-red-200 text-xs mb-2">{userData.ville}</p>}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>{niveauInfo.label}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff20', color: '#fff' }}>Niveau {niveauInfo.niveau}</span>
                <span className="text-xs font-semibold" style={{ color: '#f0e8c8' }}>{userData?.points || 0} points</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setEditForm({
                nom: userData?.nom || '',
                prenom: userData?.prenom || '',
                telephone: userData?.telephone || '',
                fonction: userData?.fonction || '',
                entreprise: userData?.entreprise || '',
                bio: userData?.bio || '',
                ville: userData?.ville || '',
              })
              setShowEdit(true)
            }}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
            style={{ backgroundColor: '#ffffff20', color: '#fff' }}
          >
            <Edit size={16} />
            Modifier le profil
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: 'Formations suivies', value: inscriptions.length, color: '#96121c' },
            { icon: Award, label: 'Badges obtenus', value: badges.length, color: '#9b8e56' },
            { icon: TrendingUp, label: 'Points accumules', value: userData?.points || 0, color: '#96121c' },
            { icon: MessageSquare2, label: 'Discussions', value: posts.length, color: '#9b8e56' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={i} className="rounded-xl p-5 flex items-center gap-4 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-xl" style={{ color: '#1a1a2e' }}>{value}</p>
                <p className="text-xs" style={{ color: '#6c757d' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">

            {/* BIO */}
            {userData?.bio && (
              <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
                <h2 className="font-bold text-lg mb-3" style={{ color: '#1a1a2e' }}>A propos</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#6c757d' }}>{userData.bio}</p>
              </div>
            )}

            {/* FORMATIONS */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} style={{ color: '#96121c' }} />
                <h2 className="font-bold text-lg" style={{ color: '#1a1a2e' }}>Mes formations</h2>
              </div>
              {inscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen size={40} className="mx-auto mb-3" style={{ color: '#e9ecef' }} />
                  <p className="font-semibold mb-2" style={{ color: '#1a1a2e' }}>Aucune formation suivie</p>
                  <Link href="/cours" className="text-sm font-semibold" style={{ color: '#96121c' }}>Voir le catalogue</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {inscriptions.map((insc, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{insc.cours?.titre}</p>
                          <p className="text-xs" style={{ color: '#6c757d' }}>{insc.cours?.categorie} — {insc.cours?.duree}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>{insc.progression}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ backgroundColor: '#e9ecef' }}>
                        <div className="h-2 rounded-full" style={{ backgroundColor: '#9b8e56', width: `${insc.progression}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DISCUSSIONS */}
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center gap-2 mb-6">
                <Clock size={20} style={{ color: '#9b8e56' }} />
                <h2 className="font-bold text-lg" style={{ color: '#1a1a2e' }}>Mes discussions</h2>
              </div>
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-semibold mb-2" style={{ color: '#1a1a2e' }}>Aucune discussion publiee</p>
                  <Link href="/communaute" className="text-sm font-semibold" style={{ color: '#96121c' }}>Rejoindre la communaute</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post, i) => (
                    <Link href={`/communaute/${post.id}`} key={i}>
                      <div className="p-4 rounded-xl hover:shadow-sm transition-all" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{post.titre}</p>
                          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>{post.categorie}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs" style={{ color: '#6c757d' }}>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                          <span className="text-xs flex items-center gap-1" style={{ color: '#9b8e56' }}>
                            <Star size={11} />{post.likes} likes
                          </span>
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
            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Ma progression</h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#96121c15', border: '3px solid #96121c' }}>
                  <span className="font-bold text-2xl" style={{ color: '#96121c' }}>{niveauInfo.niveau}</span>
                </div>
                <p className="font-bold" style={{ color: '#1a1a2e' }}>Niveau {niveauInfo.niveau}</p>
                <p className="text-sm" style={{ color: '#6c757d' }}>{niveauInfo.label}</p>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#6c757d' }}>{userData?.points || 0} pts</span>
                <span style={{ color: '#9b8e56' }}>{niveauInfo.next} pts</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: '#e9ecef' }}>
                <div className="h-2 rounded-full" style={{ backgroundColor: '#96121c', width: `${progression}%` }} />
              </div>
              <p className="text-xs mt-1" style={{ color: '#6c757d' }}>{niveauInfo.next - (userData?.points || 0)} points pour le niveau suivant</p>
            </div>

            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Mes badges</h2>
              {badges.length === 0 ? (
                <div className="text-center py-4">
                  <Award size={36} className="mx-auto mb-2" style={{ color: '#e9ecef' }} />
                  <p className="text-sm" style={{ color: '#6c757d' }}>Participez pour gagner des badges</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((ub, i) => (
                    <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#f8f9fa', border: `1px solid ${ub.badge?.couleur}40` }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${ub.badge?.couleur}20` }}>
                        <Award size={18} style={{ color: ub.badge?.couleur }} />
                      </div>
                      <p className="text-xs font-semibold" style={{ color: '#1a1a2e' }}>{ub.badge?.titre}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl p-6 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Gagner des points</h2>
              <div className="space-y-3">
                {[
                  { action: 'Publier une discussion', points: '+10 pts' },
                  { action: 'Commenter un post', points: '+5 pts' },
                  { action: 'S inscrire a un evenement', points: '+15 pts' },
                  { action: 'Terminer une formation', points: '+50 pts' },
                ].map(({ action, points }, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: '#9b8e56' }} />
                      <span className="text-sm" style={{ color: '#6c757d' }}>{action}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#96121c' }}>{points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}