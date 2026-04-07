'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, Users, Music, Globe, Search, Bell, Settings, Star, Zap, BarChart3, MapPin, Calendar, Play, Heart, Share2, Filter, ArrowUpRight, Sparkles, Target, Rocket, Eye, Loader2, ChevronRight, Activity, ShieldCheck, ZapOff, Flame
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import Navigation from '@/components/enhanced/Navigation'
import SearchBar from '@/components/enhanced/SearchBar'
import TrendingSection from '@/components/enhanced/TrendingSection'
import { getTrendingArtists } from '@/lib/api'
import { TrendingArtistItem } from '@/lib/types'

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [aiPredictions, setAiPredictions] = useState<TrendingArtistItem[]>([])
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true)
  const [pulseIndex, setPulseIndex] = useState(0)

  const marketPulse = [
    "🔥 Afrobeats Velocity +45% in London",
    "🚀 Discovery: Shallipopi (Momentum: 0.92)",
    "📈 Amapiano spreading to 15+ new regions",
    "✨ AI Prediction Accuracy: 96.4%",
    "🎵 Hip-Hop dominance remains in Gen-Z markets"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % marketPulse.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const mockUser = {
    name: 'A&R Intelligence',
    email: 'intel@talentradar.ai',
    role: 'Lead Strategist'
  }

  useEffect(() => {
    async function fetchPredictions() {
      setIsLoadingPredictions(true)
      try {
        const data = await getTrendingArtists('global', undefined, 3)
        setAiPredictions(data.trending_artists)
      } catch (error) {
        console.error('Failed to fetch predictions:', error)
      } finally {
        setIsLoadingPredictions(false)
      }
    }
    fetchPredictions()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Precision Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px]" />
      </div>

      <Navigation user={mockUser} />

      {/* Pulse Ticker - Tighter & More Professional */}
      <div className="bg-black/60 border-b border-white/5 backdrop-blur-2xl sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Live Pulse</span>
            </div>
            <div className="overflow-hidden h-4 flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={pulseIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  className="text-[11px] font-bold text-slate-400 absolute inset-0"
                >
                  {marketPulse[pulseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Intelligence Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-white/5 border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1">Console v2.4</Badge>
                <div className="flex items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  <Activity className="w-3 h-3 mr-1" /> System Nominal
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
                Market <br />
                <span className="gradient-text-premium italic">Intelligence.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Aggregated signals and predictive modeling for the next generation of global talent discovery.
              </p>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-3xl">
              <Button variant="outline" className="rounded-xl px-6 border-white/5 bg-white/5 hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="gradient" className="rounded-xl px-6">
                <Target className="w-4 h-4 mr-2" />
                Start Discovery
              </Button>
            </div>
          </div>
        </div>

        {/* Global Analytics Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Intelligence Base', value: '2.4M+', change: '+12%', icon: Users, color: 'text-blue-400' },
            { label: 'Breakout Precision', value: '96.4%', change: '+2.1%', icon: ShieldCheck, color: 'text-emerald-400' },
            { label: 'Signals / Sec', value: '154K', change: '+34k', icon: Activity, color: 'text-orange-400' },
            { label: 'Active Breakouts', value: '847', change: '+23%', icon: Flame, color: 'text-rose-400' }
          ].map((stat, i) => (
            <Card key={i} className="bg-white/5 border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all group cursor-default">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-[10px] font-black text-emerald-400">{stat.change}</div>
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Intelligence Engine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <TrendingSection
              title="🔥 Global Trending Intelligence"
              timeframe="24h"
              region="global"
              limit={8}
              showFilters={true}
            />
          </div>

          <div className="space-y-6">
            {/* Predictive Analysis Card */}
            <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-3xl">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-white text-sm font-black flex items-center uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                  AI Prediction Engine
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {isLoadingPredictions ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-4" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Processing Data...</span>
                    </div>
                  ) : aiPredictions.map((prediction, i) => (
                    <Link key={i} href={`/artist/${prediction.artist.id}`} className="block group">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-3">
                          <img src={prediction.artist.image_url} className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{prediction.artist.name}</h4>
                            <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                              <Zap className="w-3 h-3 mr-1 text-orange-500 fill-current" />
                              {prediction.artist.breakout_score}% Score
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest">
                  Full Prediction List
                </Button>
              </CardContent>
            </Card>

            {/* Quick Intelligence Tools */}
            <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-3xl">
               <CardContent className="p-6 space-y-3">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Intelligence Tools</h4>
                 {[
                   { label: 'Discovery Engine', icon: Search, color: 'text-orange-500' },
                   { label: 'Market Pulse', icon: BarChart3, color: 'text-blue-500' },
                   { label: 'A&R CRM', icon: Users, color: 'text-purple-500' },
                   { label: 'Network Graph', icon: Globe, color: 'text-emerald-500' }
                 ].map((tool, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all group">
                     <div className="flex items-center gap-3">
                       <tool.icon className={`w-4 h-4 ${tool.color}`} />
                       <span className="text-sm font-bold text-slate-300 group-hover:text-white">{tool.label}</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white" />
                   </button>
                 ))}
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
