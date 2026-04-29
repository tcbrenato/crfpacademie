'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Trash2, ArrowLeft } from 'lucide-react'

const niveaux = ['Debutant', 'Intermediaire', 'Avance']
const categories = ['Marketing', 'Management', 'Finance', 'Technologie', 'RH', 'Communication']

export default function AdminCoursPage() {
  const [cours, setCours] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    titre: '',
    description: '',
    categorie: '',
    niveau: '',
    duree: '',
    prix: 0,
    gratuit: false,
    video_url: '',
  })

  useEffect(() => {
    fetchCours()
  }, [])

  const fetchCours = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/cours')
      const data = await res.json()
      setCours(data.cours || [])
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
    if (!form.titre || !form.description || !form.categorie || !form.niveau || !form.duree) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/cours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          prix: form.gratuit ? 0 : parseFloat(form.prix),
        }),
      })
      if (res.ok) {
        setShowForm(false)
        setForm({ titre: '', description: '', categorie: '', niveau: '', duree: '', prix: 0, gratuit: false, video_url: '' })
        fetchCours()
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
            <Link href="/admin/cours" className="text-white text-sm font-semibold border-b-2 pb-1" style={{ borderColor: '#96121c' }}>Cours</Link>
            <Link href="/admin/evenements" className="text-gray-400 hover:text-white text-sm transition-colors">Evenements</Link>
            <Link href="/admin/produits" className="text-gray-400 hover:text-white text-sm transition-colors">Produits</Link>
            <Link href="/admin/membres" className="text-gray-400 hover:text-white text-sm transition-colors">Membres</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#0D0D0D' }}>Gestion des Formations</h1>
            <p className="text-gray-500">{cours.length} formation{cours.length > 1 ? 's' : ''} au total</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c' }}>
            <Plus size={18} />
            Nouvelle formation
          </button>
        </div>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#0D0D0D', border: '1px solid #333' }}>
            <h2 className="text-white font-bold text-lg mb-6">Ajouter une formation</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Titre de la formation *</label>
                <input name="titre" type="text" placeholder="Ex: Marketing Digital Avance" value={form.titre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Description *</label>
                <textarea name="description" placeholder="Description de la formation..." value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white resize-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Categorie *</label>
                <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#9ca3af' }}>
                  <option value="">Selectionnez une categorie</option>
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Niveau *</label>
                <select name="niveau" value={form.niveau} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#9ca3af' }}>
                  <option value="">Selectionnez un niveau</option>
                  {niveaux.map((niv, i) => <option key={i} value={niv}>{niv}</option>)}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Duree *</label>
                <input name="duree" type="text" placeholder="Ex: 8h, 12h30" value={form.duree} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Lien video (YouTube)</label>
                <input name="video_url" type="text" placeholder="https://youtube.com/..." value={form.video_url} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input name="gratuit" type="checkbox" checked={form.gratuit} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-gray-400 text-sm">Formation gratuite</span>
                </label>
              </div>

              {!form.gratuit && (
                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <input name="prix" type="number" placeholder="Ex: 25000" value={form.prix} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              )}

            </div>

            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Enregistrement...' : 'Enregistrer la formation'}
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
        ) : cours.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
            <BookOpen size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
            <p className="text-gray-400 font-semibold">Aucune formation pour le moment</p>
            <p className="text-gray-600 text-sm mt-2">Cliquez sur "Nouvelle formation" pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cours.map((c) => (
              <div key={c.id} className="rounded-xl p-5 flex items-center justify-between" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#96121c25' }}>
                    <BookOpen size={22} style={{ color: '#96121c' }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{c.titre}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>{c.categorie}</span>
                      <span className="text-gray-400 text-xs">{c.niveau}</span>
                      <span className="text-gray-400 text-xs">{c.duree}</span>
                      <span className="text-xs font-semibold" style={{ color: c.gratuit ? '#16a34a' : '#fff' }}>
                        {c.gratuit ? 'Gratuit' : `${c.prix} FCFA`}
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