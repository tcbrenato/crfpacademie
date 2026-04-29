import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'CRFP Academie — Cabinet de Recherche et de Formation Perfection',
  description: 'Plateforme de formation professionnelle en ligne',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}