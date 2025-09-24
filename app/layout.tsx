import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TalentRadar - Global A&R Discovery Platform',
  description: 'Discover emerging talent from around the world with AI-powered insights and predictions. The future of A&R is here.',
  keywords: 'A&R, talent discovery, music industry, AI predictions, global artists, emerging talent',
  authors: [{ name: 'TalentRadar Team' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'TalentRadar - Global A&R Discovery Platform',
    description: 'Discover emerging talent from around the world with AI-powered insights and predictions.',
    type: 'website',
    locale: 'en_US',
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
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}