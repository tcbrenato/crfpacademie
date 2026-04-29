'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpen, Clock, Star, Search, Filter } from 'lucide-react'

const categories = ['Tous', 'Marketing', 'Management', 'Finance', 'Technologie', 'RH']
const niveaux = ['Tous niveaux', 'Debutant', 'Intermediaire', 'Avance']

export default function CoursPage() {
  const router = useRouter()
  const [cours, setCours] = useState([])
  const [loading, setLoading] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [categorieActive, setCategorieActive] = useState('Tous')
  const [niveauActif, setNiveauActif] = useState('Tous niveaux')
  const [prixActif, setPrixActif] = useState('Tous')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    fetchCours()
  }, [categorieActive, niveauActif, prixActif])

  const fetchCours = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categorieActive !== 'Tous') params.append('categorie', categorieActive)
      if (niveauActif !== 'Tous niveaux') params.append('niveau', niveauActif)
      if (prixActif === 'Gratuit') params.append('gratuit', 'true')
      const res = await fetch(`/api/cours?${params}`)
      const data = await res.json()
      setCours(data.cours || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceder = (coursId) => {
    if (user) {
      router.push(`/cours/${coursId}`)
    } else {
      router.push('/login')
    }
  }

  const coursFiltres = cours.filter(c =>
    c.titre.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* HERO */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Nos Formations</h1>
          <p className="text-red-100 text-lg mb-8">Des formations professionnelles certifiantes pour accelerer votre carriere</p>
          <div className="relative max-w-2xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher une formation..." value={recherche} onChange={(e) => setRecherche(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl outline-none text-sm" style={{ backgroundColor: '#ffffff', color: '#1a1a2e' }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <div className="flex items-center gap-2 mb-4">
                <Filter size={16} style={{ color: '#9b8e56' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>Categories</h3>
              </div>
              <div className="space-y-1">
                {categories.map((cat, i) => (
                  <button key={i} onClick={() => setCategorieActive(cat)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: categorieActive === cat ? '#96121c' : 'transparent', color: categorieActive === cat ? '#fff' : '#6c757d' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Niveau</h3>
              <div className="space-y-1">
                {niveaux.map((niv, i) => (
                  <button key={i} onClick={() => setNiveauActif(niv)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: niveauActif === niv ? '#96121c' : 'transparent', color: niveauActif === niv ? '#fff' : '#6c757d' }}>
                    {niv}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Prix</h3>
              <div className="space-y-1">
                {['Tous', 'Gratuit', 'Payant'].map((p, i) => (
                  <button key={i} onClick={() => setPrixActif(p)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: prixActif === p ? '#96121c' : 'transparent', color: prixActif === p ? '#fff' : '#6c757d' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LISTE COURS */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: '#6c757d' }}>{coursFiltres.length} formation{coursFiltres.length > 1 ? 's' : ''} disponible{coursFiltres.length > 1 ? 's' : ''}</p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl h-64 animate-pulse bg-white" style={{ border: '1px solid #e9ecef' }} />
                ))}
              </div>
            ) : coursFiltres.length === 0 ? (
              <div className="rounded-xl p-12 text-center bg-white" style={{ border: '1px solid #e9ecef' }}>
                <BookOpen size={48} className="mx-auto mb-4" style={{ color: '#e9ecef' }} />
                <p className="font-semibold" style={{ color: '#1a1a2e' }}>Aucune formation disponible</p>
                <p className="text-sm mt-2" style={{ color: '#6c757d' }}>Les formations seront ajoutees bientot</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {coursFiltres.map((c) => (
                  <div key={c.id} className="rounded-xl overflow-hidden bg-white hover:shadow-md transition-all" style={{ border: '1px solid #e9ecef' }}>
                    <div className="h-40 flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#96121c15' }}>
                        <BookOpen size={32} style={{ color: '#96121c' }} />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>
                          {c.categorie}
                        </span>
                        <span className="text-xs font-bold" style={{ color: c.gratuit ? '#16a34a' : '#96121c' }}>
                          {c.gratuit ? 'Gratuit' : `${c.prix} FCFA`}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>{c.titre}</h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#6c757d' }}>{c.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-xs" style={{ color: '#6c757d' }}>
                          <Clock size={13} />
                          <span>{c.duree}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs" style={{ color: '#9b8e56' }}>
                          <Star size={13} />
                          <span>{c.note || 'Nouveau'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#f8f9fa', color: '#6c757d', border: '1px solid #e9ecef' }}>
                          {c.niveau}
                        </span>
                        <button onClick={() => handleAcceder(c.id)} className="text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c' }}>
                          {user ? 'Acceder' : 'Se connecter'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}