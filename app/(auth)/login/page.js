'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')
  const [form, setForm] = useState({ email: '', motDePasse: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setErreur('')
    if (!form.email || !form.motDePasse) {
      setErreur('Veuillez remplir tous les champs')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErreur(data.error || 'Email ou mot de passe incorrect')
      } else {
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/dashboard')
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
          <h2 className="text-4xl font-bold text-white mb-4">Bon retour parmi nous</h2>
          <p className="text-red-100 text-lg">Continuez votre parcours de formation et rejoignez votre communaute.</p>
          <div className="mt-10 space-y-4">
            {['Acces a vos formations en cours', 'Suivez votre progression', 'Rejoignez les discussions', 'Consultez vos certificats'].map((item, i) => (
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
            <h1 className="text-2xl font-bold text-white mb-1">Connexion</h1>
            <p className="text-gray-400 text-sm mb-8">Entrez vos identifiants pour acceder a votre espace</p>

            {erreur && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#96121c20', border: '1px solid #96121c50', color: '#ff6b6b' }}>
                {erreur}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Adresse email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="motDePasse" type="password" placeholder="Votre mot de passe" value={form.motDePasse} onChange={handleChange} className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none text-white" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-400 text-sm">Se souvenir de moi</span>
                </label>
                <Link href="#" className="text-sm hover:opacity-80" style={{ color: '#9b8e56' }}>
                  Mot de passe oublie ?
                </Link>
              </div>

              <button onClick={handleSubmit} disabled={loading} className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Connexion en cours...' : 'Se connecter'}
                {!loading && <ArrowRight size={18} />}
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px" style={{ backgroundColor: '#333' }} />
                <span className="text-gray-500 text-xs">OU</span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#333' }} />
              </div>

              <p className="text-center text-gray-500 text-sm">
                Pas encore de compte ?{' '}
                <Link href="/register" className="font-semibold hover:opacity-80" style={{ color: '#9b8e56' }}>
                  Creer un compte gratuit
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}