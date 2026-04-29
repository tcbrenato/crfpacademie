'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogOut, Settings, ChevronDown, BookOpen, Users, Calendar, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  const navLinks = [
    { href: '/cours',       label: 'Formations',  icon: BookOpen },
    { href: '/communaute',  label: 'Communauté',  icon: Users },
    { href: '/evenements',  label: 'Événements',  icon: Calendar },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  ]

  return (
    <>
      <style>{`
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background: #96121c;
          transition: box-shadow 0.3s ease;
        }
        .nav-root.scrolled {
          box-shadow: 0 4px 24px rgba(150,18,28,0.35);
        }

        /* ── NAV LINK ── */
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease;
          letter-spacing: 0.01em;
        }
        .nav-link svg { opacity: 0.7; transition: opacity 0.2s; }
        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.12);
        }
        .nav-link:hover svg { opacity: 1; }
        .nav-link.active {
          color: #fff;
          background: rgba(255,255,255,0.18);
        }
        /* Underline indicator */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 14px;
          right: 14px;
          height: 2px;
          border-radius: 2px;
          background: #ffd700;
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .nav-link.active::after,
        .nav-link:hover::after { transform: scaleX(1); }

        /* ── LOGO ── */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .logo-wrap:hover .logo-icon {
          background: rgba(255,255,255,0.25);
          transform: rotate(-4deg) scale(1.05);
        }
        .logo-name { font-weight: 800; font-size: 15px; color: #fff; line-height: 1.1; }
        .logo-sub  { font-size: 10px; color: rgba(255,220,80,0.85); font-weight: 500; letter-spacing: 0.03em; }

        /* ── BTN CONNEXION ── */
        .btn-login {
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;
        }
        .btn-login:hover {
          background: rgba(255,255,255,0.2);
          color: #fff;
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-1px);
        }

        /* ── BTN REGISTER ── */
        .btn-register {
          font-size: 13px;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 10px;
          color: #96121c;
          background: #fff;
          border: none;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.2);
          background: #fff9f9;
        }

        /* ── USER CHIP ── */
        .user-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 8px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .user-chip:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }
        .user-avatar {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 12px; color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .user-name { font-size: 13px; font-weight: 600; color: #fff; }

        /* ── BTN ADMIN ── */
        .btn-admin {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(155,142,86,0.25);
          color: #ffd700;
          border: 1px solid rgba(255,215,0,0.3);
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .btn-admin:hover {
          background: rgba(255,215,0,0.25);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(255,215,0,0.2);
        }

        /* ── BTN LOGOUT ── */
        .btn-logout {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          color: rgba(255,255,255,0.7);
        }
        .btn-logout:hover {
          background: rgba(255,255,255,0.2);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        /* ── DASHBOARD LINK ── */
        .btn-dashboard {
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 10px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }
        .btn-dashboard:hover { color: #fff; background: rgba(255,255,255,0.1); }

        /* ── DIVIDER ── */
        .nav-divider {
          width: 1px; height: 24px;
          background: rgba(255,255,255,0.18);
          flex-shrink: 0;
        }

        /* ── MOBILE TOGGLE ── */
        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          color: #fff;
          transition: background 0.2s;
        }
        .mobile-toggle:hover { background: rgba(255,255,255,0.22); }

        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          background: #7a0f17;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 12px 24px 20px;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin: 10px 0;
        }
        .mobile-action-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-action-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .mobile-btn-register {
          display: block;
          text-align: center;
          padding: 12px;
          border-radius: 10px;
          background: #fff;
          color: #96121c;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          margin-top: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .mobile-btn-register:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
      `}</style>

      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* LOGO */}
          <Link href={user ? '/dashboard' : '/'} className="logo-wrap">
            <div className="logo-icon">
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 11, letterSpacing: '0.02em' }}>CRF</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="logo-name">CRFP Académie</span>
              <span className="logo-sub">Cabinet de Recherche et de Formation - Perfection</span>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`nav-link${pathname === href ? ' active' : ''}`}>
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin" className="btn-admin">
                    <Settings size={12} />
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="btn-dashboard">Dashboard</Link>
                <div className="nav-divider" />
                <Link href="/profil" className="user-chip" style={{ textDecoration: 'none' }}>
                  <div className="user-avatar">{user.nom?.charAt(0).toUpperCase()}</div>
                  <span className="user-name">{user.nom?.split(' ')[0]}</span>
                  <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 2 }} />
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-login">Connexion</Link>
                <Link href="/register" className="btn-register">Commencer gratuitement</Link>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`mobile-nav-link${pathname === href ? ' active' : ''}`}>
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <div className="mobile-divider" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="mobile-action-link">Dashboard</Link>
                <Link href="/profil" onClick={() => setMenuOpen(false)} className="mobile-action-link">Mon profil</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="mobile-action-link" style={{ color: '#ffd700' }}>
                    <Settings size={15} />
                    Panneau Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="mobile-action-link" style={{ color: 'rgba(255,150,150,0.9)' }}>
                  <LogOut size={15} />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="mobile-action-link">Connexion</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="mobile-btn-register">Commencer gratuitement</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}