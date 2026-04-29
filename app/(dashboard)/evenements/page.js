'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Users, MapPin, Video } from 'lucide-react'

const types = ['Tous', 'Masterclass', 'Webinaire', 'Formation', 'Table ronde']

export default function EvenementsPage() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)
  const [typeActif, setTypeActif] = useState('Tous')
  const [acces, setAcces] = useState('Tous')

  useEffect(() => {
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

  const evenementsFiltres = evenements.filter(ev => {
    const matchType = typeActif === 'Tous' || ev.type === typeActif
    const matchAcces = acces === 'Tous' || (acces === 'Gratuit' ? ev.gratuit : !ev.gratuit)
    return matchType && matchAcces
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>

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
            <div className="rounded-xl p-5" style={{ backgroundColor: '#0D0D0D' }}>
              <h3 className="text-white font-semibold mb-4">Type d evenement</h3>
              <div className="space-y-2">
                {types.map((type, i) => (
                  <button key={i} onClick={() => setTypeActif(type)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: typeActif === type ? '#96121c' : '#1a1a1a', color: typeActif === type ? '#fff' : '#9ca3af' }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ backgroundColor: '#0D0D0D' }}>
              <h3 className="text-white font-semibold mb-4">Acces</h3>
              <div className="space-y-2">
                {['Tous', 'Gratuit', 'Payant'].map((p, i) => (
                  <button key={i} onClick={() => setAcces(p)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: acces === p ? '#96121c' : '#1a1a1a', color: acces === p ? '#fff' : '#9ca3af' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LISTE */}
          <div className="md:col-span-3 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl h-48 animate-pulse" style={{ backgroundColor: '#0D0D0D' }} />
                ))}
              </div>
            ) : evenementsFiltres.length === 0 ? (
              <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
                <Calendar size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
                <p className="text-gray-400 font-semibold">Aucun evenement disponible</p>
                <p className="text-gray-600 text-sm mt-2">Les evenements seront annonces bientot</p>
              </div>
            ) : (
              evenementsFiltres.map((ev) => (
                <div key={ev.id} className="rounded-xl p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
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
                          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>
                            {ev.type}
                          </span>
                          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: ev.gratuit ? '#16a34a20' : '#96121c20', color: ev.gratuit ? '#16a34a' : '#96121c' }}>
                            {ev.gratuit ? 'Gratuit' : `${ev.prix} FCFA`}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{ev.titre}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{ev.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Clock size={13} />
                          <span>{ev.heure}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          {ev.lieu === 'En ligne' ? <Video size={13} /> : <MapPin size={13} />}
                          <span>{ev.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Users size={13} />
                          <span>{ev.inscrits} / {ev.places} inscrits</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#1a1a1a' }}>
                          <div className="h-1.5 rounded-full" style={{ backgroundColor: '#9b8e56', width: `${Math.min((ev.inscrits / ev.places) * 100, 100)}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-semibold">{ev.intervenant}</p>
                          <p className="text-gray-500 text-xs">{ev.role_intervenant}</p>
                        </div>
                        <Link href="/register" className="text-white text-sm font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c' }}>
                          S inscrire
                        </Link>
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