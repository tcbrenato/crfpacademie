'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Plus, Trash2, ArrowLeft } from 'lucide-react'

const types = ['Masterclass', 'Webinaire', 'Formation', 'Table ronde']

export default function AdminEvenementsPage() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    titre: '',
    description: '',
    type: '',
    date: '',
    heure: '',
    lieu: '',
    intervenant: '',
    role_intervenant: '',
    places: '',
    gratuit: true,
    prix: 0,
  })

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

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = async () => {
    if (!form.titre || !form.description || !form.type || !form.date || !form.heure || !form.lieu || !form.intervenant || !form.role_intervenant || !form.places) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/evenements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          places: parseInt(form.places),
          prix: form.gratuit ? 0 : parseFloat(form.prix),
          inscrits: 0,
        }),
      })
      if (res.ok) {
        setShowForm(false)
        setForm({ titre: '', description: '', type: '', date: '', heure: '', lieu: '', intervenant: '', role_intervenant: '', places: '', gratuit: true, prix: 0 })
        fetchEvenements()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
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
            <Link href="/admin/evenements" className="text-white text-sm font-semibold border-b-2 pb-1" style={{ borderColor: '#96121c' }}>Evenements</Link>
            <Link href="/admin/produits" className="text-gray-400 hover:text-white text-sm transition-colors">Produits</Link>
            <Link href="/admin/membres" className="text-gray-400 hover:text-white text-sm transition-colors">Membres</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#0D0D0D' }}>Gestion des Evenements</h1>
            <p className="text-gray-500">{evenements.length} evenement{evenements.length > 1 ? 's' : ''} au total</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c' }}>
            <Plus size={18} />
            Nouvel evenement
          </button>
        </div>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#0D0D0D', border: '1px solid #333' }}>
            <h2 className="text-white font-bold text-lg mb-6">Ajouter un evenement</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Titre *</label>
                <input name="titre" type="text" placeholder="Ex: Masterclass Marketing Digital" value={form.titre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Description *</label>
                <textarea name="description" placeholder="Description de l evenement..." value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white resize-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Type *</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#9ca3af' }}>
                  <option value="">Selectionnez un type</option>
                  {types.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Lieu *</label>
                <input name="lieu" type="text" placeholder="Ex: En ligne, Cotonou..." value={form.lieu} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Date *</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Heure *</label>
                <input name="heure" type="text" placeholder="Ex: 18h00 - 20h00" value={form.heure} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Intervenant *</label>
                <input name="intervenant" type="text" placeholder="Nom de l intervenant" value={form.intervenant} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Role de l intervenant *</label>
                <input name="role_intervenant" type="text" placeholder="Ex: CEO, Expert Finance..." value={form.role_intervenant} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Nombre de places *</label>
                <input name="places" type="number" placeholder="Ex: 100" value={form.places} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input name="gratuit" type="checkbox" checked={form.gratuit} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-gray-400 text-sm">Evenement gratuit</span>
                </label>
              </div>

              {!form.gratuit && (
                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <input name="prix" type="number" placeholder="Ex: 10000" value={form.prix} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              )}

            </div>

            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Enregistrement...' : 'Enregistrer l evenement'}
              </button>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors" style={{ backgroundColor: '#1a1a1a' }}>
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* LISTE */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl h-24 animate-pulse" style={{ backgroundColor: '#0D0D0D' }} />
            ))}
          </div>
        ) : evenements.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
            <Calendar size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
            <p className="text-gray-400 font-semibold">Aucun evenement pour le moment</p>
            <p className="text-gray-600 text-sm mt-2">Cliquez sur "Nouvel evenement" pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {evenements.map((ev) => (
              <div key={ev.id} className="rounded-xl p-5 flex items-center justify-between" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                    <span className="text-white font-bold text-lg leading-none">{new Date(ev.date).getDate()}</span>
                    <span className="text-red-200 text-xs">{new Date(ev.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{ev.titre}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>{ev.type}</span>
                      <span className="text-gray-400 text-xs">{ev.heure}</span>
                      <span className="text-gray-400 text-xs">{ev.lieu}</span>
                      <span className="text-xs font-semibold" style={{ color: ev.gratuit ? '#16a34a' : '#fff' }}>
                        {ev.gratuit ? 'Gratuit' : `${ev.prix} FCFA`}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}