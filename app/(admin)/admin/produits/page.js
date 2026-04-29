'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Plus, Trash2, ArrowLeft } from 'lucide-react'

const categories = ['Templates', 'Guides', 'Formation', 'Outils']

export default function AdminProduitsPage() {
  const [produits, setProduits] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    titre: '',
    description: '',
    categorie: '',
    prix: 0,
    gratuit: false,
    fichier_url: '',
    vendeur_nom: 'CRF Perfection',
  })

  useEffect(() => {
    fetchProduits()
  }, [])

  const fetchProduits = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/produits')
      const data = await res.json()
      setProduits(data.produits || [])
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
    if (!form.titre || !form.description || !form.categorie || !form.vendeur_nom) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/produits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          prix: form.gratuit ? 0 : parseFloat(form.prix),
          telechargements: 0,
          note: 0,
        }),
      })
      if (res.ok) {
        setShowForm(false)
        setForm({ titre: '', description: '', categorie: '', prix: 0, gratuit: false, fichier_url: '', vendeur_nom: 'CRF Perfection' })
        fetchProduits()
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
            <Link href="/admin/evenements" className="text-gray-400 hover:text-white text-sm transition-colors">Evenements</Link>
            <Link href="/admin/produits" className="text-white text-sm font-semibold border-b-2 pb-1" style={{ borderColor: '#96121c' }}>Produits</Link>
            <Link href="/admin/membres" className="text-gray-400 hover:text-white text-sm transition-colors">Membres</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#0D0D0D' }}>Gestion des Produits</h1>
            <p className="text-gray-500">{produits.length} produit{produits.length > 1 ? 's' : ''} au total</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c' }}>
            <Plus size={18} />
            Nouveau produit
          </button>
        </div>

        {/* FORMULAIRE */}
        {showForm && (
          <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#0D0D0D', border: '1px solid #333' }}>
            <h2 className="text-white font-bold text-lg mb-6">Ajouter un produit</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Titre du produit *</label>
                <input name="titre" type="text" placeholder="Ex: Pack Templates Business Plan" value={form.titre} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Description *</label>
                <textarea name="description" placeholder="Description du produit..." value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white resize-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Categorie *</label>
                <select name="categorie" value={form.categorie} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#9ca3af' }}>
                  <option value="">Selectionnez une categorie</option>
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Vendeur *</label>
                <input name="vendeur_nom" type="text" placeholder="Nom du vendeur" value={form.vendeur_nom} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Lien du fichier</label>
                <input name="fichier_url" type="text" placeholder="https://drive.google.com/..." value={form.fichier_url} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
              </div>

              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input name="gratuit" type="checkbox" checked={form.gratuit} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-gray-400 text-sm">Produit gratuit</span>
                </label>
              </div>

              {!form.gratuit && (
                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <input name="prix" type="number" placeholder="Ex: 15000" value={form.prix} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              )}

            </div>

            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Enregistrement...' : 'Enregistrer le produit'}
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
        ) : produits.length === 0 ? (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#0D0D0D' }}>
            <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: '#333' }} />
            <p className="text-gray-400 font-semibold">Aucun produit pour le moment</p>
            <p className="text-gray-600 text-sm mt-2">Cliquez sur "Nouveau produit" pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {produits.map((p) => (
              <div key={p.id} className="rounded-xl p-5 flex items-center justify-between" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#9b8e5625' }}>
                    <ShoppingBag size={22} style={{ color: '#9b8e56' }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{p.titre}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#9b8e5620', color: '#9b8e56' }}>{p.categorie}</span>
                      <span className="text-gray-400 text-xs">Par {p.vendeur_nom}</span>
                      <span className="text-xs font-semibold" style={{ color: p.gratuit ? '#16a34a' : '#fff' }}>
                        {p.gratuit ? 'Gratuit' : `${p.prix} FCFA`}
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