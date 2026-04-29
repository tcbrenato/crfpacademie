import Link from 'next/link'
import { ArrowLeft, BookOpen, Award, TrendingUp, Calendar, Star, CheckCircle, Clock } from 'lucide-react'

const formations_en_cours = [
  { titre: 'Marketing Digital', progression: 68, modules: 12, modules_faits: 8 },
  { titre: 'Gestion de Projet', progression: 35, modules: 8, modules_faits: 3 },
  { titre: 'Intelligence Artificielle', progression: 15, modules: 15, modules_faits: 2 },
]

const certificats = [
  { titre: 'Finance et Comptabilite', date: 'Mars 2026', mention: 'Tres Bien' },
  { titre: 'Leadership et Management', date: 'Janvier 2026', mention: 'Bien' },
]

const badges = [
  { titre: 'Premier cours', description: 'A termine son premier cours', couleur: '#9b8e56' },
  { titre: 'Assidu', description: '7 jours de connexion consecutifs', couleur: '#96121c' },
  { titre: 'Communicant', description: '10 messages dans la communaute', couleur: '#9b8e56' },
  { titre: 'Expert', description: 'A obtenu 2 certificats', couleur: '#96121c' },
]

const activites = [
  { action: 'A termine le module "Introduction au SEO"', temps: 'il y a 2h', icon: CheckCircle, color: '#16a34a' },
  { action: 'A commente dans la communaute', temps: 'il y a 5h', icon: Star, color: '#9b8e56' },
  { action: 'S est inscrit a la Masterclass du 15 Mai', temps: 'hier', icon: Calendar, color: '#96121c' },
  { action: 'A demarre la formation Intelligence Artificielle', temps: 'il y a 3 jours', icon: BookOpen, color: '#9b8e56' },
]

export default function ProfilPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#96121c' }} className="w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-red-100 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#ffffff20' }}>
                <span className="text-white font-bold text-sm">CRF</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">CRFP</span>
                <span style={{ color: '#f0e8c8' }} className="font-bold text-lg"> Academie</span>
              </div>
            </div>
          </div>
          <Link href="/register" className="text-sm font-semibold px-5 py-2 rounded-lg" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
            Commencer
          </Link>
        </div>
      </nav>

      {/* HERO PROFIL */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0" style={{ backgroundColor: '#0D0D0D', border: '3px solid #9b8e56' }}>
            K
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Kouassi Jean</h1>
            <p className="text-red-100 mb-2">Professionnel — Cotonou, Benin</p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
                Membre Pro
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff20', color: '#fff' }}>
                Niveau 4
              </span>
              <span className="text-xs font-semibold" style={{ color: '#f0e8c8' }}>
                1 240 points
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: 'Formations suivies', value: '5', color: '#96121c' },
            { icon: Award, label: 'Certificats obtenus', value: '2', color: '#9b8e56' },
            { icon: TrendingUp, label: 'Points accumulated', value: '1 240', color: '#96121c' },
            { icon: Calendar, label: 'Jours de connexion', value: '28', color: '#9b8e56' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={i} className="rounded-xl p-5 flex items-center gap-4" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}25` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* COLONNE GAUCHE */}
          <div className="md:col-span-2 space-y-8">

            {/* FORMATIONS EN COURS */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} style={{ color: '#96121c' }} />
                <h2 className="text-white font-bold text-lg">Formations en cours</h2>
              </div>
              <div className="space-y-5">
                {formations_en_cours.map((f, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold text-sm">{f.titre}</p>
                      <span className="text-xs font-bold" style={{ color: '#9b8e56' }}>{f.progression}%</span>
                    </div>
                    <div className="h-2 rounded-full mb-1" style={{ backgroundColor: '#1a1a1a' }}>
                      <div className="h-2 rounded-full transition-all" style={{ backgroundColor: '#9b8e56', width: `${f.progression}%` }} />
                    </div>
                    <p className="text-gray-500 text-xs">{f.modules_faits} / {f.modules} modules termines</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATS */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} style={{ color: '#9b8e56' }} />
                <h2 className="text-white font-bold text-lg">Certificats obtenus</h2>
              </div>
              <div className="space-y-4">
                {certificats.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#1a1a1a', border: '1px solid #9b8e5640' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#9b8e5620' }}>
                        <Award size={22} style={{ color: '#9b8e56' }} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{cert.titre}</p>
                        <p className="text-gray-500 text-xs">{cert.date} — Mention : {cert.mention}</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90" style={{ backgroundColor: '#9b8e56', color: '#fff' }}>
                      Telecharger
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVITE RECENTE */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <div className="flex items-center gap-2 mb-6">
                <Clock size={20} style={{ color: '#96121c' }} />
                <h2 className="text-white font-bold text-lg">Activite recente</h2>
              </div>
              <div className="space-y-4">
                {activites.map((act, i) => {
                  const Icon = act.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${act.color}20` }}>
                        <Icon size={15} style={{ color: act.color }} />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">{act.action}</p>
                        <p className="text-gray-500 text-xs mt-1">{act.temps}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="space-y-6">

            {/* NIVEAU */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <h2 className="text-white font-bold text-lg mb-4">Progression niveau</h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#96121c25', border: '3px solid #96121c' }}>
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <p className="text-white font-semibold">Niveau 4</p>
                <p className="text-gray-400 text-xs">Expert en formation</p>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">1 240 pts</span>
                  <span style={{ color: '#9b8e56' }}>1 500 pts</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#96121c', width: '83%' }} />
                </div>
                <p className="text-gray-500 text-xs mt-1">260 points pour le niveau 5</p>
              </div>
            </div>

            {/* BADGES */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#0D0D0D' }}>
              <h2 className="text-white font-bold text-lg mb-4">Badges obtenus</h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, i) => (
                  <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: '#1a1a1a', border: `1px solid ${badge.couleur}40` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${badge.couleur}25` }}>
                      <Award size={18} style={{ color: badge.couleur }} />
                    </div>
                    <p className="text-white text-xs font-semibold">{badge.titre}</p>
                    <p className="text-gray-500 text-xs mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}