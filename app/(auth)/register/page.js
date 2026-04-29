'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    profil: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setErreur('')
    if (!form.nom || !form.email || !form.motDePasse || !form.profil) {
      setErreur('Veuillez remplir tous les champs obligatoires')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error || 'Erreur lors de la creation du compte')
      } else {
        router.push('/login')
      }
    } catch (err) {
      setErreur('Erreur serveur, veuillez reessayer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f5f5f5' }}>

      {/* GAUCHE */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12" style={{ backgroundColor: '#96121c' }}>
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">Rejoignez notre communaute de professionnels</h2>
          <p className="text-red-100 text-lg">Acces a des formations certifiantes, une communaute active et un suivi personnalise.</p>
          <div className="mt-10 space-y-4">
            {['Plus de 500 membres actifs', '30+ formations disponibles', 'Certificats reconnus', 'Communaute francophone'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9b8e56' }}>
                  <ArrowRight size={12} className="text-white" />
                </div>
                <span className="text-red-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-red-200 text-sm">Cabinet de Recherche et de Formation Perfection — Cotonou, Benin</p>
      </div>

      {/* DROITE */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-8" style={{ backgroundColor: '#0D0D0D' }}>
            <h1 className="text-2xl font-bold text-white mb-1">Creer un compte</h1>
            <p className="text-gray-400 text-sm mb-8">Inscription gratuite — acces immediat</p>

            {erreur && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#96121c20', border: '1px solid #96121c50', color: '#ff6b6b' }}>
                {erreur}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Nom complet</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="nom" type="text" placeholder="Ex: Kouassi Jean" value={form.nom} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Adresse email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Telephone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="telephone" type="tel" placeholder="+229 XX XX XX XX" value={form.telephone} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="motDePasse" type="password" placeholder="Minimum 8 caracteres" value={form.motDePasse} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Vous etes</label>
                <select name="profil" value={form.profil} onChange={handleChange} className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#9ca3af' }}>
                  <option value="">Selectionnez votre profil</option>
                  <option value="etudiant">Etudiant</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>

              <button onClick={handleSubmit} disabled={loading} className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity mt-2" style={{ backgroundColor: '#96121c', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creation en cours...' : 'Creer mon compte gratuitement'}
                {!loading && <ArrowRight size={18} />}
              </button>

              <p className="text-center text-gray-500 text-sm">
                Deja inscrit ?{' '}
                <Link href="/login" className="font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}