'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Clock, Star, Users, Award, ChevronRight, Play, Lock, CheckCircle, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function CoursDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [cours, setCours] = useState(null)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [inscrit, setInscrit] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    fetchCours()
  }, [id])

  const fetchCours = async () => {
    setLoading(true)
    try {
      const { data: coursData } = await supabase
        .from('cours')
        .select('*')
        .eq('id', id)
        .single()

      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .eq('cours_id', id)
        .order('ordre', { ascending: true })

      setCours(coursData)
      setModules(modulesData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInscrire = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    try {
      const { error } = await supabase
        .from('inscriptions')
        .insert([{ user_id: user.id, cours_id: id, progression: 0 }])
      if (!error) setInscrit(true)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: '#96121c', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: '#6c757d' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!cours) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <p className="font-semibold text-lg mb-4" style={{ color: '#1a1a2e' }}>Formation introuvable</p>
          <Link href="/cours" className="text-white px-6 py-3 rounded-lg font-semibold" style={{ backgroundColor: '#96121c' }}>
            Retour aux formations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* HERO */}
      <div className="px-6 py-12" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-7xl mx-auto">
          <Link href="/cours" className="inline-flex items-center gap-2 text-red-100 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} />
            Retour aux formations
          </Link>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff20', color: '#f0e8c8' }}>
                  {cours.categorie}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff20', color: '#f0e8c8' }}>
                  {cours.niveau}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{cours.titre}</h1>
              <p className="text-red-100 text-lg mb-6">{cours.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-red-100 text-sm">
                  <Clock size={16} />
                  <span>{cours.duree}</span>
                </div>
                <div className="flex items-center gap-2 text-red-100 text-sm">
                  <Star size={16} style={{ color: '#f0e8c8' }} />
                  <span>{cours.note || 'Nouveau'}</span>
                </div>
                <div className="flex items-center gap-2 text-red-100 text-sm">
                  <BookOpen size={16} />
                  <span>{modules.length} modules</span>
                </div>
              </div>
            </div>

            {/* CARTE INSCRIPTION */}
            <div className="bg-white rounded-2xl p-6 shadow-lg" style={{ border: '1px solid #e9ecef' }}>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold mb-1" style={{ color: cours.gratuit ? '#16a34a' : '#96121c' }}>
                  {cours.gratuit ? 'Gratuit' : `${cours.prix} FCFA`}
                </p>
                {!cours.gratuit && <p className="text-xs" style={{ color: '#6c757d' }}>Paiement unique</p>}
              </div>
              {inscrit ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3" style={{ color: '#16a34a' }}>
                    <CheckCircle size={20} />
                    <span className="font-semibold">Vous etes inscrit !</span>
                  </div>
                  <p className="text-sm" style={{ color: '#6c757d' }}>Commencez votre apprentissage maintenant</p>
                </div>
              ) : (
                <button onClick={handleInscrire} className="w-full text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity mb-4" style={{ backgroundColor: '#96121c' }}>
                  {cours.gratuit ? 'S inscrire gratuitement' : 'Acheter cette formation'}
                </button>
              )}
              <div className="space-y-3 mt-4">
                {[
                  { icon: BookOpen, text: `${modules.length} modules de formation` },
                  { icon: Clock, text: `${cours.duree} de contenu` },
                  { icon: Award, text: 'Certificat de completion' },
                  { icon: Users, text: 'Acces a la communaute' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#6c757d' }}>
                    <Icon size={16} style={{ color: '#9b8e56' }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">

            {/* MODULES */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: '#1a1a2e' }}>Contenu de la formation</h2>
              {modules.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen size={40} className="mx-auto mb-3" style={{ color: '#e9ecef' }} />
                  <p className="font-semibold" style={{ color: '#1a1a2e' }}>Modules en cours de preparation</p>
                  <p className="text-sm mt-1" style={{ color: '#6c757d' }}>Le contenu sera disponible bientot</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {modules.map((module, i) => (
                    <div key={module.id} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: inscrit ? '#96121c' : '#e9ecef' }}>
                          {inscrit ? <Play size={14} className="text-white" /> : <Lock size={14} style={{ color: '#6c757d' }} />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{module.titre}</p>
                          {module.duree && <p className="text-xs" style={{ color: '#6c757d' }}>{module.duree}</p>}
                        </div>
                      </div>
                      {inscrit && (
                        <ChevronRight size={16} style={{ color: '#96121c' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* VIDEO */}
            {cours.video_url && inscrit && (
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1a2e' }}>Video de presentation</h2>
                <div className="rounded-xl overflow-hidden aspect-video">
                  <iframe
                    src={cours.video_url.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Ce que vous apprendrez</h3>
              <div className="space-y-3">
                {[
                  'Maitrisez les concepts fondamentaux',
                  'Appliquez vos connaissances en pratique',
                  'Obtenez un certificat reconnu',
                  'Rejoignez une communaute de professionnels',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#9b8e56' }} />
                    <span className="text-sm" style={{ color: '#6c757d' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-bold mb-4" style={{ color: '#1a1a2e' }}>Autres formations</h3>
              <Link href="/cours" className="flex items-center gap-2 text-sm font-semibold hover:opacity-80" style={{ color: '#96121c' }}>
                Voir tout le catalogue
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}