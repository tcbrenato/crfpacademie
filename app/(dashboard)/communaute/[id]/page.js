'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ThumbsUp, MessageSquare, ArrowLeft, Send, Clock } from 'lucide-react'

export default function PostDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [commentaires, setCommentaires] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [commentaire, setCommentaire] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/posts/${id}`)
      const data = await res.json()
      setPost(data.post)
      setCommentaires(data.commentaires || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!user) return
    try {
      const res = await fetch('/api/posts/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: id }),
      })
      const data = await res.json()
      setPost({ ...post, likes: data.likes })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCommentaire = async () => {
    if (!commentaire.trim() || !user) return
    setSending(true)
    try {
      const res = await fetch('/api/commentaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenu: commentaire,
          user_id: user.id,
          post_id: id,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setCommentaires([...commentaires, data.commentaire])
        setCommentaire('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 animate-spin mx-auto mb-4" style={{ borderColor: '#96121c', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: '#6c757d' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <p className="font-semibold text-lg mb-4" style={{ color: '#1a1a2e' }}>Discussion introuvable</p>
          <Link href="/communaute" className="text-white px-6 py-3 rounded-lg font-semibold" style={{ backgroundColor: '#96121c' }}>
            Retour a la communaute
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

      {/* HERO */}
      <div className="px-6 py-10" style={{ backgroundColor: '#96121c' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/communaute" className="inline-flex items-center gap-2 text-red-100 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} />
            Retour a la communaute
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#ffffff20', color: '#f0e8c8' }}>
              {post.categorie}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{post.titre}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: '#ffffff30' }}>
                {post.users?.nom?.charAt(0) || 'M'}
              </div>
              <span className="text-red-100 text-sm">{post.users?.nom || 'Membre'}</span>
            </div>
            <div className="flex items-center gap-1 text-red-100 text-sm">
              <Clock size={14} />
              <span>{new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* CONTENU PRINCIPAL */}
          <div className="md:col-span-2 space-y-6">

            {/* POST */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#4a5568' }}>{post.contenu}</p>
              <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid #f0f0f0' }}>
                <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-50" style={{ color: '#6c757d', border: '1px solid #e9ecef' }}>
                  <ThumbsUp size={16} />
                  {post.likes || 0} J aime
                </button>
                <span className="flex items-center gap-2 text-sm" style={{ color: '#6c757d' }}>
                  <MessageSquare size={16} />
                  {commentaires.length} commentaire{commentaires.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* COMMENTAIRES */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e9ecef' }}>
              <h2 className="font-bold text-lg mb-6" style={{ color: '#1a1a2e' }}>
                {commentaires.length} Commentaire{commentaires.length > 1 ? 's' : ''}
              </h2>

              {/* FORMULAIRE COMMENTAIRE */}
              {user ? (
                <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                      {user.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Ecrivez votre commentaire..."
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none bg-white"
                        style={{ border: '1px solid #e9ecef', color: '#1a1a2e' }}
                      />
                      <div className="flex justify-end mt-2">
                        <button onClick={handleCommentaire} disabled={sending || !commentaire.trim()} className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#96121c', opacity: sending || !commentaire.trim() ? 0.6 : 1 }}>
                          <Send size={14} />
                          {sending ? 'Envoi...' : 'Commenter'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-xl text-center" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                  <p className="text-sm mb-3" style={{ color: '#6c757d' }}>Connectez-vous pour commenter</p>
                  <Link href="/login" className="text-sm font-semibold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#96121c' }}>
                    Se connecter
                  </Link>
                </div>
              )}

              {/* LISTE COMMENTAIRES */}
              {commentaires.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare size={36} className="mx-auto mb-3" style={{ color: '#e9ecef' }} />
                  <p className="text-sm" style={{ color: '#6c757d' }}>Aucun commentaire pour le moment</p>
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Soyez le premier a commenter !</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {commentaires.map((com) => (
                    <div key={com.id} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#9b8e56' }}>
                        {com.users?.nom?.charAt(0) || 'M'}
                      </div>
                      <div className="flex-1 p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{com.users?.nom || 'Membre'}</p>
                          <p className="text-xs" style={{ color: '#9ca3af' }}>{new Date(com.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{com.contenu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: '#1a1a2e' }}>A propos de l auteur</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: '#96121c' }}>
                  {post.users?.nom?.charAt(0) || 'M'}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1a1a2e' }}>{post.users?.nom || 'Membre'}</p>
                  <p className="text-xs" style={{ color: '#9b8e56' }}>{post.users?.role || 'Membre'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e9ecef' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#1a1a2e' }}>Autres discussions</h3>
              <Link href="/communaute" className="text-sm font-semibold hover:opacity-80" style={{ color: '#96121c' }}>
                Voir toutes les discussions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}