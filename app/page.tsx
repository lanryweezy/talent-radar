'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, TrendingUp, Users, Music, Globe, Star, ArrowRight, Play, BarChart3, Mail, CheckCircle, MapPin, Calendar, Video, Sparkles, Target, Rocket, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import WaitlistModal from '@/components/WaitlistModal'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const globalStats = {
    global: { artists: '2.4M+', countries: '150+', languages: '50+', regions: 'Worldwide' },
    africa: { artists: '450K+', countries: '54', languages: '20+', regions: 'All African Markets' },
    asia: { artists: '680K+', countries: '48', languages: '15+', regions: 'APAC Region' },
    americas: { artists: '890K+', countries: '35', languages: '10+', regions: 'North & South America' },
    europe: { artists: '420K+', countries: '44', languages: '12+', regions: 'European Union+' }
  }

  const currentStats = globalStats[selectedRegion as keyof typeof globalStats] || globalStats.global

  return (
    <div className="min-h-screen bg-black relative overflow-hidden selection:bg-orange-500/30">
      {/* Precision Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] grid-overlay pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">TALENTRADAR</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Intelligence</Link>
          <Link href="/analytics" className="hover:text-white transition-colors">Market Pulse</Link>
          <Link href="/discover" className="hover:text-white transition-colors">Discovery</Link>
        </div>
        <Link href="/dashboard">
          <Button variant="gradient" className="rounded-full px-6 py-2 text-sm font-bold">
            Launch Console
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Global A&R Intelligence Engine v2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]"
            >
              The Science of <br />
              <span className="gradient-text-premium italic">Global Discovery.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-medium"
            >
              Quantifying cultural momentum across 150+ countries.
              Identify emerging breakout talent with our proprietary Talent Score™ and multi-platform velocity tracking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-20"
            >
              <Link href="/dashboard">
                <Button size="lg" variant="gradient" className="px-10 py-7 text-lg font-black group">
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-10 py-7 text-lg font-black border-white/10 hover:bg-white/5" onClick={() => setShowWaitlistModal(true)}>
                Watch Intelligence Demo
              </Button>
            </motion.div>
          </div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 glass-card rounded-3xl border border-white/10"
          >
            {[
              { label: 'Artists Tracked', value: '2.4M+', detail: 'Global Coverage' },
              { label: 'Breakout Accuracy', value: '94%', detail: 'AI Confidence' },
              { label: 'Data Points', value: '450B', detail: 'Real-time ingestion' },
              { label: 'Market Signals', value: '150+', detail: 'Cultural Indicators' }
            ].map((stat, i) => (
              <div key={i} className="p-6 border-r border-white/5 last:border-0">
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-[10px] text-slate-500 font-medium">{stat.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Core Intelligence Pillar */}
      <div className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Core Intelligence</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Engineered for the <br /> Modern A&R.</h3>
            </div>
            <p className="text-slate-400 font-medium max-w-sm mb-2 leading-relaxed">
              Our proprietary infrastructure processes billions of signals daily to identify global breakout talent before they reach the mainstream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Talent Score v2.4',
                desc: 'Our proprietary weighted matrix calculating velocity, engagement, and cross-platform cultural pull.',
                icon: Rocket
              },
              {
                title: 'AI Archetyping',
                desc: 'Categorize artists via sonic fingerprints and audience DNA using deep learning models.',
                icon: Target
              },
              {
                title: 'Node Analytics',
                desc: 'Visualize regional opportunity clusters and identify underserved markets in real-time.',
                icon: Globe
              }
            ].map((f, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border border-white/5 hover:border-orange-500/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <f.icon className="w-32 h-32 text-white" />
                </div>
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500/20 transition-colors">
                  <f.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{f.title}</h4>
                <p className="text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works / The Methodology */}
      <div className="py-32 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">The Methodology</h2>
             <h3 className="text-5xl font-black text-white tracking-tighter mb-6">From Signal to Signing.</h3>
             <p className="text-slate-400 font-medium">A standardized framework for data-driven artist acquisition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { step: '01', title: 'Data Ingestion', desc: 'Aggregate streams, social, and cultural signals.' },
               { step: '02', title: 'Signal Isolation', desc: 'Identify non-linear growth patterns and outliers.' },
               { step: '03', title: 'AI Validation', desc: 'Predict long-term scalability and market fit.' },
               { step: '04', title: 'A&R Review', desc: 'Executive intelligence briefing for rapid signing.' }
             ].map((s, i) => (
               <div key={i} className="p-8 border-l border-white/5 hover:bg-white/5 transition-all">
                  <div className="text-3xl font-black text-orange-500/20 mb-6">{s.step}</div>
                  <h4 className="text-lg font-black text-white mb-3">{s.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{s.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Trust / Social Proof */}
      <div className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Trusted by Intelligence Leads at</h2>
           <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             {/* Mock Partner Logos */}
             <div className="text-2xl font-black tracking-tighter text-white">SONIC CAPITAL</div>
             <div className="text-2xl font-black tracking-tighter text-white">GLOBAL LABELS</div>
             <div className="text-2xl font-black tracking-tighter text-white">ALPHA RECORDS</div>
             <div className="text-2xl font-black tracking-tighter text-white">VORTEX MUSIC</div>
             <div className="text-2xl font-black tracking-tighter text-white">INDIE DISTRO</div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-lg font-black text-white tracking-tighter">TALENTRADAR</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © 2024 TalentRadar Intelligence. Built for the Next Billion Streams.
          </p>
          <div className="flex space-x-6 text-slate-400">
            <Link href="#" className="hover:text-white transition-colors font-bold text-xs">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors font-bold text-xs">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors font-bold text-xs">API Documentation</Link>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </div>
  )
}