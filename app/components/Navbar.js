'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <nav style={{ backgroundColor: '#96121c' }} className="w-full shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#ffffff20' }}>
            <span className="text-white font-bold text-sm">CRF</span>
          </div>
          <div>
            <span className="text-white font-bold text-lg">CRFP</span>
            <span style={{ color: '#f0e8c8' }} className="font-bold text-lg"> Academie</span>
          </div>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/cours" className="text-red-100 hover:text-white text-sm font-medium transition-colors">Formations</Link>
          <Link href="/communaute" className="text-red-100 hover:text-white text-sm font-medium transition-colors">Communaute</Link>
          <Link href="/evenements" className="text-red-100 hover:text-white text-sm font-medium transition-colors">Evenements</Link>
          <Link href="/marketplace" className="text-red-100 hover:text-white text-sm font-medium transition-colors">Marketplace</Link>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Link href="/admin" className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
                  <Settings size={13} />
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="text-red-100 hover:text-white text-sm transition-colors">
                Dashboard
              </Link>
              <Link href="/profil">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer" style={{ backgroundColor: '#0D0D0D', border: '2px solid #9b8e56' }}>
                  {user.nom?.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-100 hover:text-white text-sm transition-colors">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-red-100 hover:text-white text-sm font-medium transition-colors px-4 py-2">
                Connexion
              </Link>
              <Link href="/register" className="text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
                Commencer
              </Link>
            </div>
          )}
        </div>

        {/* MENU MOBILE */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE OUVERT */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3" style={{ backgroundColor: '#96121c' }}>
          <Link href="/cours" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Formations</Link>
          <Link href="/communaute" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Communaute</Link>
          <Link href="/evenements" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Evenements</Link>
          <Link href="/marketplace" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Marketplace</Link>
          <div style={{ height: 1, backgroundColor: '#ffffff20' }} />
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Dashboard</Link>
              <Link href="/profil" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Mon profil</Link>
              {user.role === 'admin' && (
                <Link href="/admin" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold py-2" style={{ color: '#9b8e56' }}>Panneau Admin</Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-100 hover:text-white text-sm font-medium py-2">
                <LogOut size={15} />
                Deconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-red-100 hover:text-white text-sm font-medium py-2">Connexion</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold py-2" style={{ color: '#9b8e56' }}>Creer un compte</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}