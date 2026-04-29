"use client"

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Users, Award, Calendar, ShoppingBag, TrendingUp, ChevronRight, Star, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="px-6 py-10 relative overflow-hidden flex items-center min-h-[82vh]">
        
        {/* BACKGROUND VISIBLE */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: 'url(/bg1.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            opacity: '0.65'
          }} 
        />
        <div className="absolute inset-0 z-0 bg-white/30" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium" style={{ backgroundColor: '#96121c10', color: '#96121c', border: '1px solid #96121c20' }}>
              <Star size={14} />
              Plateforme de formation professionnelle
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-5" style={{ color: '#1a1a2e' }}>
              Développez vos
              <span style={{ color: '#96121c' }}> compétences </span>
              avec les meilleurs experts
            </h1>
            <p className="text-lg leading-relaxed mb-7" style={{ color: '#1a1a2e', fontWeight: 500 }}>
              Accès à des formations certifiantes, une communauté de professionnels et un suivi personnalisé pour accélérer votre carrière.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <Link 
                href="/register" 
                className="flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg"
                style={{ backgroundColor: '#96121c' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(150,18,28,0.38)'; e.currentTarget.style.backgroundColor = '#b0161f'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.backgroundColor = '#96121c'; }}
              >
                Commencer gratuitement
                <ChevronRight size={18} />
              </Link>
              <Link 
                href="/cours" 
                className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all"
                style={{ color: '#1a1a2e', border: '1px solid #e9ecef' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.color = '#96121c'; e.currentTarget.style.borderColor = 'rgba(150,18,28,0.3)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.color = '#1a1a2e'; e.currentTarget.style.borderColor = '#e9ecef'; e.currentTarget.style.boxShadow = ''; }}
              >
                Voir les formations
              </Link>
            </div>

            {/* STATS */}
            <div className="flex items-center gap-6">
              {[
                { value: '500+', label: 'Membres actifs' },
                { value: '30+', label: 'Formations' },
                { value: '95%', label: 'Satisfaction' },
              ].map(({ value, label }, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div style={{ width: 1, height: 32, backgroundColor: '#e9ecef' }} />}
                  <div>
                    <p className="font-bold text-xl" style={{ color: '#96121c' }}>{value}</p>
                    <p className="text-xs font-medium" style={{ color: '#6c757d' }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE RÉDUITE + ANIMATION LUMIÈRE */}
          <div className="hidden md:block relative">
            {/* Halo de lueur derrière */}
            <div 
              className="absolute inset-[-10px] rounded-[2.5rem] z-0"
              style={{
                background: 'conic-gradient(from 0deg, rgba(150,18,28,0.35), rgba(155,142,86,0.35), rgba(255,215,0,0.25), rgba(150,18,28,0.35))',
                filter: 'blur(14px)',
                animation: 'spinConic 5s linear infinite',
              }}
            />

            {/* Cadre tournant */}
            <div className="relative p-[4px] overflow-hidden rounded-[2.2rem] shadow-2xl">
              {/* Rotation lente dorée-rouge */}
              <div style={{
                position: 'absolute',
                inset: '-200%',
                animation: 'spinConic 5s linear infinite',
                background: 'conic-gradient(from 0deg, #9b8e56 0%, #96121c 25%, #ffd700 35%, #96121c 50%, #9b8e56 65%, #ffd700 75%, #9b8e56 100%)',
              }} />
              {/* Éclat de lumière rapide */}
              <div style={{
                position: 'absolute',
                inset: '-200%',
                animation: 'spinConic 2.2s linear infinite reverse',
                background: 'conic-gradient(from 90deg, transparent 0%, rgba(255,255,255,0.85) 8%, transparent 16%, transparent 50%, rgba(255,220,80,0.5) 58%, transparent 66%)',
                mixBlendMode: 'screen',
              }} />

              {/* IMAGE RÉDUITE */}
              <div className="relative bg-white rounded-[2rem] overflow-hidden z-10">
                <Image 
                  src="/herobg1.png" 
                  alt="CRFP Academie" 
                  width={520} 
                  height={310}
                  className="w-full object-cover"
                  style={{ maxHeight: '310px' }}
                />
              </div>
            </div>

            {/* BADGES FLOTTANTS */}
            <div 
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg z-20 transition-all duration-300 cursor-default"
              style={{ border: '1px solid #e9ecef', animation: 'floatY 3s ease-in-out infinite' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#9b8e5615' }}>
                  <Award size={20} style={{ color: '#9b8e56' }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1a1a2e' }}>500+ Certifiés</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>cette année</p>
                </div>
              </div>
            </div>
            <div 
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg z-20 transition-all duration-300 cursor-default"
              style={{ border: '1px solid #e9ecef', animation: 'floatY 3.5s ease-in-out infinite reverse' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#96121c15' }}>
                  <Star size={20} style={{ color: '#96121c' }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1a1a2e' }}>4.9/5</p>
                  <p className="text-xs" style={{ color: '#6c757d' }}>Note moyenne</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KEYFRAMES injectés en style global */}
        <style>{`
          @keyframes spinConic {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-8px); }
          }
        `}</style>
      </section>

      {/* BANDE PARTENAIRES */}
      <section className="py-6 px-6" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #e9ecef', borderBottom: '1px solid #e9ecef' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#9ca3af' }}>Ils nous font confiance</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['PME Benin', 'StartupHub', 'CCI Cotonou', 'UEMOA', 'BankFinance'].map((name, i) => (
              <span 
                key={i} 
                className="text-sm font-bold transition-colors duration-200 cursor-default"
                style={{ color: '#9ca3af' }}
                onMouseEnter={e => e.currentTarget.style.color = '#9b8e56'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section className="py-20 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest" style={{ backgroundColor: '#96121c10', color: '#96121c' }}>Fonctionnalités</span>
            <h2 className="text-4xl font-bold mt-4 mb-3" style={{ color: '#1a1a2e' }}>Tout ce dont vous avez besoin</h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#6c757d' }}>Une plateforme complète pour votre développement professionnel</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: BookOpen,   title: 'Formations certifiantes', desc: 'Cours vidéo de qualité avec quiz, exercices pratiques et certificats reconnus par les employeurs.', color: '#96121c' },
              { icon: Users,      title: 'Communauté active',       desc: 'Échangez avec des professionnels, posez vos questions et partagez vos expériences du terrain.', color: '#9b8e56' },
              { icon: Award,      title: 'Badges et certifications',desc: 'Valorisez vos compétences avec un système de points, badges et certificats numériques.', color: '#96121c' },
              { icon: Calendar,   title: 'Événements en direct',    desc: 'Participez aux webinaires, masterclasses et sessions live animées par nos experts.', color: '#9b8e56' },
              { icon: ShoppingBag,title: 'Marketplace',             desc: 'Achetez et vendez des formations, templates et ressources pour votre activité.', color: '#96121c' },
              { icon: TrendingUp, title: 'Suivi de progression',    desc: 'Visualisez votre évolution avec des statistiques détaillées et des rapports personnalisés.', color: '#9b8e56' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div 
                key={i} 
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 cursor-default"
                style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.10)'; e.currentTarget.style.borderColor = `${color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#f0f0f0'; }}
              >
                <div className="h-36 relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
                  <Icon size={56} style={{ color: `${color}30` }} />
                  <div className="absolute bottom-3 left-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2" style={{ color: '#1a1a2e' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6c757d' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 px-6" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest" style={{ backgroundColor: '#9b8e5615', color: '#9b8e56' }}>Comment ça marche</span>
            <h2 className="text-4xl font-bold mt-4" style={{ color: '#1a1a2e' }}>Commencez en 3 étapes simples</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Créez votre compte',       desc: 'Inscrivez-vous gratuitement en moins de 2 minutes et accédez immédiatement à la plateforme.' },
              { num: '02', title: 'Choisissez une formation', desc: 'Parcourez notre catalogue de formations et choisissez celle qui correspond à vos objectifs.' },
              { num: '03', title: 'Apprenez et progressez',   desc: 'Suivez les cours à votre rythme, participez à la communauté et obtenez votre certificat.' },
            ].map(({ num, title, desc }, i) => (
              <div key={i} className="relative">
                <div 
                  className="rounded-2xl p-8 bg-white border border-gray-100 cursor-default"
                  style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.09)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <span className="text-6xl font-bold mb-4 block" style={{ color: '#96121c15' }}>{num}</span>
                  <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6c757d' }}>{desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ArrowRight size={20} style={{ color: '#96121c' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Prêt à vous lancer ?</h2>
          <p className="text-red-100 text-lg mb-8">Rejoignez des centaines de professionnels qui se forment chaque jour sur CRFP Académie.</p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-xl bg-white transition-all"
              style={{ color: '#96121c' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              Créer mon compte gratuitement
              <ChevronRight size={20} />
            </Link>
            <Link 
              href="/cours" 
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all border text-white"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = ''; }}
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#96121c' }}>
                  <span className="text-white font-bold text-xs">CRF</span>
                </div>
                <span className="font-bold" style={{ color: '#1a1a2e' }}>CRFP Académie</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6c757d' }}>Cabinet de Recherche et de Formation Perfection — Cotonou, Bénin</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: '#1a1a2e' }}>Plateforme</h4>
              <div className="space-y-2">
                {[['Formations', '/cours'], ['Communauté', '/communaute'], ['Événements', '/evenements'], ['Marketplace', '/marketplace']].map(([item, href], i) => (
                  <Link key={i} href={href} className="block text-sm text-gray-500 hover:text-[#96121c] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: '#1a1a2e' }}>Compte</h4>
              <div className="space-y-2">
                {[['Connexion', '/login'], ['Inscription', '/register'], ['Dashboard', '/dashboard']].map(([item, href], i) => (
                  <Link key={i} href={href} className="block text-sm text-gray-500 hover:text-[#96121c] transition-colors">{item}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: '#1a1a2e' }}>Contact</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Cotonou, Bénin</p>
                <p>contact@crfperfection.pro</p>
                <p>www.crfperfection.pro</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© 2026 CRFP Académie. Tous droits réservés.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#9b8e56' }} />
              <span className="text-xs font-medium" style={{ color: '#9b8e56' }}>Plateforme certifiée</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}