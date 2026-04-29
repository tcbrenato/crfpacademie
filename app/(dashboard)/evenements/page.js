'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Users, MapPin, Video, CheckCircle } from 'lucide-react'

const types = ['Tous', 'Masterclass', 'Webinaire', 'Formation', 'Table ronde']

export default function EvenementsPage() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeActif, setTypeActif] = useState('Tous')
  const [acces, setAcces] = useState('Tous')
  const [user, setUser] = useState(null)
  const [inscriptions, setInscriptions] = useState([])
  const [saving, setSaving] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    fetchEvenements()
  }, [])

  const fetchEvenements = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/evenements')
      const data = await res.json()
      setEvenements(data.evenements || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInscrire = async (evenementId) => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    setSaving(evenementId)
    try {
      const res = await fetch('/api/evenements/inscrire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evenement_id: evenementId, user_id: user.id }),
      })
      const data = await res.json()
      if (res.ok) {
        setInscriptions([...inscriptions, evenementId])
        setEvenements(evenements.map(ev =>
          ev.id === evenementId ? { ...ev, inscrits: ev.inscrits + 1 } : ev
        ))
      } else {
        if (data.error === 'Vous etes deja inscrit') {
          setInscriptions([...inscriptions, evenementId])
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(null)
    }
  }

  const evenementsFiltres = evenements.filter(ev => {
    const matchType = typeActif === 'Tous' || ev.type === typeActif
    const matchAcces = acces === 'Tous' || (acces === 'Gratuit' ? ev.gratuit : !ev.gratuit)
    return matchType && matchAcces
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* HERO */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Evenements</h1>
          <p className="text-red-100 text-lg">Webinaires, masterclasses et formations en direct avec nos experts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Type d evenement</h3>
              <div className="space-y-1">
                {types.map((type, i) => (
                  <button key={i} onClick={() => setTypeActif(type)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: typeActif === type ? '#96121c' : 'transparent', color: typeActif === type ? '#fff' : '#6c757d' }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: '#1a1a2e' }}>Acces</h3>
              <div className="space-y-1">
                {['Tous', 'Gratuit', 'Payant'].map((p, i) => (
                  <button key={i} onClick={() => setAcces(p)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: acces === p ? '#96121c' : 'transparent', color: acces === p ? '#fff' : '#6c757d' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {user && (
              <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #e9ecef' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#1a1a2e' }}>Mes inscriptions</h3>
                <p className="text-2xl font-bold" style={{ color: '#96121c' }}>{inscriptions.length}</p>
                <p className="text-xs" style={{ color: '#6c757d' }}>evenement{inscriptions.length > 1 ? 's' : ''} inscrit{inscriptions.length > 1 ? 's' : ''}</p>
              </div>
            )}
          </div>

          {/* LISTE EVENEMENTS */}
          <div className="md:col-span-3 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl h-48 animate-pulse bg-white" style={{ border: '1px solid #e9ecef' }} />
                ))}
              </div>
            ) : evenementsFiltres.length === 0 ? (
              <div className="rounded-xl p-12 text-center bg-white" style={{ border: '1px solid #e9ecef' }}>
                <Calendar size={48} className="mx-auto mb-4" style={{ color: '#e9ecef' }} />
                <p className="font-semibold" style={{ color: '#1a1a2e' }}>Aucun evenement disponible</p>
                <p className="text-sm mt-2" style={{ color: '#6c757d' }}>Les evenements seront annonces bientot</p>
              </div>
            ) : (
              evenementsFiltres.map((ev) => (
                <div key={ev.id} className="rounded-xl p-6 bg-white hover:shadow-md transition-all" style={{ border: '1px solid #e9ecef' }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">

                    {/* DATE */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: '#96121c' }}>
                      <span className="text-white font-bold text-2xl leading-none">
                        {new Date(ev.date).getDate()}
                      </span>
                      <span className="text-red-200 text-xs">
                        {new Date(ev.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </span>
                      <span className="text-red-200 text-xs">
                        {new Date(ev.date).getFullYear()}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>
                            {ev.type}
                          </span>
                          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: ev.gratuit ? '#16a34a15' : '#96121c15', color: ev.gratuit ? '#16a34a' : '#96121c' }}>
                            {ev.gratuit ? 'Gratuit' : `${ev.prix} FCFA`}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>{ev.titre}</h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#6c757d' }}>{ev.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
                          <Clock size={13} />
                          <span>{ev.heure}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
                          {ev.lieu === 'En ligne' ? <Video size={13} /> : <MapPin size={13} />}
                          <span>{ev.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
                          <Users size={13} />
                          <span>{ev.inscrits} / {ev.places} inscrits</span>
                        </div>
                      </div>

                      {/* BARRE PROGRESSION */}
                      <div className="mb-4">
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#f0f0f0' }}>
                          <div className="h-1.5 rounded-full transition-all" style={{ backgroundColor: '#9b8e56', width: `${Math.min((ev.inscrits / ev.places) * 100, 100)}%` }} />
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                          {ev.places - ev.inscrits} place{ev.places - ev.inscrits > 1 ? 's' : ''} restante{ev.places - ev.inscrits > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{ev.intervenant}</p>
                          <p className="text-xs" style={{ color: '#6c757d' }}>{ev.role_intervenant}</p>
                        </div>

                        {inscriptions.includes(ev.id) ? (
                          <div className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold" style={{ backgroundColor: '#16a34a15', color: '#16a34a' }}>
                            <CheckCircle size={16} />
                            Inscrit
                          </div>
                        ) : ev.inscrits >= ev.places ? (
                          <div className="px-5 py-2 rounded-xl text-sm font-semibold" style={{ backgroundColor: '#f0f0f0', color: '#9ca3af' }}>
                            Complet
                          </div>
                        ) : (
                          <button
                            onClick={() => handleInscrire(ev.id)}
                            disabled={saving === ev.id}
                            className="px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: '#96121c', opacity: saving === ev.id ? 0.7 : 1 }}
                          >
                            {saving === ev.id ? 'Inscription...' : 'S inscrire'}
                          </button>
                        )}
                      </div>
                    </div>
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