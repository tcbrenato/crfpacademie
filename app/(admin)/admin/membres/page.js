'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, ArrowLeft, Search, Shield, User, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminMembresPage() {
  const [membres, setMembres] = useState([])
  const [loading, setLoading] = useState(true)
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    fetchMembres()
  }, [])

  const fetchMembres = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, nom, email, role, profil, points, niveau, created_at')
        .order('created_at', { ascending: false })

      if (!error) setMembres(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const membresFiltres = membres.filter(m =>
    m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    m.email.toLowerCase().includes(recherche.toLowerCase())
  )

  const profilLabel = (profil) => {
    const labels = { etudiant: 'Etudiant', professionnel: 'Professionnel', entreprise: 'Entreprise' }
    return labels[profil] || profil
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#0D0D0D' }} className="w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#96121c' }}>
                <span className="text-white font-bold text-sm">CRF</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">CRFP</span>
                <span style={{ color: '#9b8e56' }} className="font-bold text-lg"> Admin</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
            <Link href="/admin/cours" className="text-gray-400 hover:text-white text-sm transition-colors">Cours</Link>
            <Link href="/admin/evenements" className="text-gray-400 hover:text-white text-sm transition-colors">Evenements</Link>
            <Link href="/admin/produits" className="text-gray-400 hover:text-white text-sm transition-colors">Produits</Link>
            <Link href="/admin/membres" className="text-white text-sm font-semibold border-b-2 pb-1" style={{ borderColor: '#96121c' }}>Membres</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#0D0D0D' }}>Gestion des Membres</h1>
            <p className="text-gray-500">{membres.length} membre{membres.length > 1 ? 's' : ''} inscrit{membres.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total membres', value: membres.length, color: '#96121c' },
            { label: 'Professionnels', value: membres.filter(m => m.profil === 'professionnel').length, color: '#9b8e56' },
            { label: 'Etudiants', value: membres.filter(m => m.profil === 'etudiant').length, color: '#96121c' },
          ].map(({ label, value, color }, i) => (
            <div key={i} className="rounded-xl p-5" style={{ backgroundColor: '#0D0D0D' }}>
              <p className="text-white font-bold text-2xl">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl outline-none text-sm"
            style={{ backgroundColor: '#0D0D0D', color: '#fff', border: '1px solid #333' }}
          />
        </div>

        {/* LISTE */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl h-20 animate-pulse" style={{ backgroundColor: '#0D0D0D' }} />
            ))}
          </div>
        ) : membresFiltres.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
            <Users size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
            <p className="text-gray-400 font-semibold">Aucun membre trouve</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
            {/* HEADER TABLE */}
            <div className="grid grid-cols-5 gap-4 px-6 py-3 text-xs font-semibold uppercase" style={{ backgroundColor: '#1a1a1a', color: '#9b8e56' }}>
              <div className="col-span-2">Membre</div>
              <div>Profil</div>
              <div>Points</div>
              <div>Actions</div>
            </div>

            {/* ROWS */}
            {membresFiltres.map((m, i) => (
              <div key={m.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center" style={{ borderTop: i > 0 ? '1px solid #1a1a1a' : 'none' }}>
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                    {m.nom.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{m.nom}</p>
                    <p className="text-gray-500 text-xs">{m.email}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>
                    {profilLabel(m.profil)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{m.points} pts</p>
                  <p className="text-gray-500 text-xs">Niveau {m.niveau}</p>
                </div>
                <div className="flex items-center gap-2">
                  {m.role !== 'admin' && (
                    <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>
                      <Shield size={12} />
                      Admin
                    </button>
                  )}
                  <button className="text-gray-500 hover:text-red-500 transition-colors p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}