import Link from 'next/link'
import { BookOpen, Users, Award, Calendar, ShoppingBag, TrendingUp, ChevronRight, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="pt-20 pb-24 px-6" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#ffffff15', border: '1px solid #ffffff30' }}>
              <Star size={14} style={{ color: '#f0e8c8' }} />
              <span style={{ color: '#f0e8c8' }} className="text-sm font-medium">Cabinet de Recherche et de Formation Perfection</span>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Formez-vous avec les
              <span style={{ color: '#f0e8c8' }}> meilleurs experts</span>
            </h1>
            <p className="text-red-100 text-lg leading-relaxed mb-8">
              Acces a des formations professionnelles certifiantes, une communaute active et un suivi personnalise pour atteindre vos objectifs.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/register" className="flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0D0D0D' }}>
                Rejoindre gratuitement
                <ChevronRight size={18} />
              </Link>
              <Link href="/cours" className="flex items-center gap-2 font-semibold px-8 py-4 rounded-lg hover:opacity-80 transition-opacity" style={{ border: '1px solid #f0e8c8', color: '#f0e8c8' }}>
                Voir les formations
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-10">
              <div>
                <p className="text-white font-bold text-2xl">500+</p>
                <p className="text-red-100 text-sm">Membres actifs</p>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: '#ffffff30' }} />
              <div>
                <p className="text-white font-bold text-2xl">30+</p>
                <p className="text-red-100 text-sm">Formations</p>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: '#ffffff30' }} />
              <div>
                <p className="text-white font-bold text-2xl">95%</p>
                <p className="text-red-100 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* CARTE HERO */}
          <div className="relative hidden md:block">
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0D0D0D', border: '1px solid #333' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#96121c' }}>
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Marketing Digital</p>
                  <p className="text-gray-400 text-xs">12 modules — Avance</p>
                </div>
                <div className="ml-auto text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e5625', color: '#9b8e56' }}>
                  Populaire
                </div>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs">Progression</span>
                  <span className="text-xs font-semibold" style={{ color: '#9b8e56' }}>68%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: '#333' }}>
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#9b8e56', width: '68%' }} />
                </div>
              </div>
              <div className="space-y-2">
                {['Introduction au SEO', 'Publicite en ligne', 'Reseaux sociaux'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: i < 2 ? '#96121c' : '#333' }}>
                      {i < 2 && <ChevronRight size={10} className="text-white" />}
                    </div>
                    <span className="text-xs" style={{ color: i < 2 ? '#d1d5db' : '#6b7280' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0D0D0D' }}>Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500 text-lg">Une plateforme complete pour votre developpement professionnel</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Formations certifiantes', desc: 'Acces a des cours video de qualite avec quiz, exercices et certificats reconnus.', color: '#96121c' },
              { icon: Users, title: 'Communaute active', desc: 'Echangez avec des professionnels, posez vos questions et partagez vos experiences.', color: '#9b8e56' },
              { icon: Award, title: 'Badges et certifications', desc: 'Valorisez vos competences avec un systeme de points, badges et certificats.', color: '#96121c' },
              { icon: Calendar, title: 'Evenements en direct', desc: 'Participez aux webinaires, masterclasses et sessions live avec nos experts.', color: '#9b8e56' },
              { icon: ShoppingBag, title: 'Marketplace', desc: 'Achetez et vendez des formations, templates et ressources professionnelles.', color: '#96121c' },
              { icon: TrendingUp, title: 'Suivi de progression', desc: 'Visualisez votre evolution et atteignez vos objectifs avec des statistiques detaillees.', color: '#9b8e56' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="rounded-xl p-8 hover:shadow-xl transition-shadow group" style={{ backgroundColor: '#0D0D0D', border: '1px solid #222' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${color}25` }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#9b8e56' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Pret a vous lancer ?</h2>
          <p className="text-yellow-100 text-lg mb-8">Rejoignez des centaines de professionnels qui se forment chaque jour sur CRFP Academie.</p>
          <Link href="/register" className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', color: '#fff' }}>
            Creer mon compte gratuitement
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#ffffff20' }}>
              <span className="text-white font-bold text-sm">CRF</span>
            </div>
            <div>
              <span className="text-white font-bold">CRFP</span>
              <span style={{ color: '#f0e8c8' }} className="font-bold"> Academie</span>
            </div>
          </div>
          <p className="text-red-100 text-sm">Cabinet de Recherche et de Formation Perfection — Cotonou, Benin</p>
          <p className="text-red-200 text-sm">2026 CRFP Academie. Tous droits reserves.</p>
        </div>
      </footer>

    </main>
  )
}