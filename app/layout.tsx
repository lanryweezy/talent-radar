import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'TalentRadar - Global A&R Discovery Platform',
  description: 'Discover emerging talent from around the world with AI-powered insights and predictions. The future of A&R is here.',
  keywords: 'A&R, talent discovery, music industry, AI predictions, global artists, emerging talent',
  authors: [{ name: 'TalentRadar Team' }],
  metadataBase: new URL('https://talent-radar.vercel.app'),
  openGraph: {
    title: 'TalentRadar - Global A&R Discovery Platform',
    description: 'Discover emerging talent from around the world with AI-powered insights and predictions.',
    url: 'https://talent-radar.vercel.app',
    siteName: 'TalentRadar',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TalentRadar Platform Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentRadar - Global A&R Discovery Platform',
    description: 'Discover emerging talent from around the world with AI-powered insights and predictions.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f59e0b',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jakarta.variable} font-jakarta antialiased bg-black text-white`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}