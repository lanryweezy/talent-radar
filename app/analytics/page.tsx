'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, BarChart3, PieChart, Users, Music, Globe, Zap, Download, Activity, Rocket, Target, ShieldCheck, Flame, ChevronRight, Map, Globe2
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Navigation from '@/components/enhanced/Navigation'
import { getMarketHeatmap } from '@/lib/api'

export default function Analytics() {
  const [heatmap, setHeatmap] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hdata = await getMarketHeatmap()
        setHeatmap(hdata)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [timeRange])

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Activity className="w-12 h-12 text-orange-500 animate-spin" /></div>

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px]" />
      </div>

      <Navigation user={{ name: 'A&R Intelligence', email: 'intel@talentradar.ai', role: 'Lead Strategist' }} />

      {/* Market Pulse Header */}
      <div className="relative z-10 pt-20 pb-12 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1">Macro Intelligence</Badge>
                <div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Globe2 className="w-3 h-3 mr-1" /> Global Coverage
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                Market <br />
                <span className="gradient-text-gold italic">Intelligence Hub.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Quantifying global cultural momentum and multi-platform breakout signals.
              </p>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-3xl w-full md:w-auto">
              <select className="bg-transparent border-0 text-sm font-black uppercase tracking-widest px-4 focus:ring-0 cursor-pointer">
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <Button variant="gradient" className="rounded-xl px-6">
                <Download className="w-4 h-4 mr-2" />
                Export Intel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-12">
        {/* Heatmap Section */}
        <section className="glass-card rounded-[40px] p-10 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between mb-12">
             <h3 className="text-xl font-black flex items-center uppercase tracking-widest">
              <Map className="w-5 h-5 mr-3 text-orange-500" />
              Regional Cultural Heat
            </h3>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-black uppercase">Live Updates</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {heatmap.map((region, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all text-center relative group"
              >
                <div className="text-3xl mb-3">{region.heat > 0.9 ? '🔥' : '✨'}</div>
                <div className="text-sm font-black text-white mb-1">{region.name}</div>
                <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{(region.heat * 100).toFixed(0)}% Momentum</div>

                {/* Micro-hover details */}
                <div className="absolute inset-0 bg-slate-950/95 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex flex-col items-center justify-center p-4 border border-orange-500/50">
                   <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Trending</div>
                   <div className="flex flex-wrap justify-center gap-1">
                     {region.trending_genres?.map((g: string) => (
                       <span key={g} className="text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded-full">{g}</span>
                     ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {[
            { label: 'Market Reach', value: '2.4B+', change: '+12%', icon: Users, color: 'text-blue-400' },
            { label: 'Discovery Depth', value: '45.2M', change: '+34k', icon: Music, color: 'text-purple-400' },
            { label: 'Growth Velocity', value: '+23.7%', change: 'Accelerating', icon: Zap, color: 'text-orange-400' },
            { label: 'Forecast Accuracy', value: '96.4%', change: 'High', icon: ShieldCheck, color: 'text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-3xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-[9px] font-black text-emerald-400">{stat.change}</div>
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Intelligence Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 rounded-[40px] p-10 overflow-hidden">
             <h3 className="text-xl font-black mb-10 flex items-center uppercase tracking-widest">
              <Activity className="w-5 h-5 mr-3 text-orange-500" />
              Velocity Trends
            </h3>
            <div className="h-64 flex items-end space-x-2">
              {[60, 45, 80, 55, 90, 70, 85, 40, 75, 95, 65, 88].map((h, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-xl relative group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-xl"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-2">
               {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                 <span key={m} className="text-[9px] font-black text-slate-600 uppercase">{m}</span>
               ))}
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 rounded-[40px] p-10">
             <h3 className="text-xl font-black mb-10 flex items-center uppercase tracking-widest">
              <PieChart className="w-5 h-5 mr-3 text-blue-500" />
              Market Composition
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Afrobeats', value: 34, color: 'bg-orange-500' },
                { label: 'Amapiano', value: 28, color: 'bg-blue-500' },
                { label: 'Latin', value: 22, color: 'bg-rose-500' },
                { label: 'K-Pop', value: 16, color: 'bg-purple-500' }
              ].map((g, i) => (
                <div key={i}>
                   <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{g.label}</span>
                    <span className="text-xs font-black text-white">{g.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${g.value}%` }}
                      className={`h-full ${g.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* High Performance Table */}
        <section className="glass-card rounded-[40px] overflow-hidden border border-white/5">
           <div className="p-10 border-b border-white/5">
             <h3 className="text-xl font-black flex items-center uppercase tracking-widest">
              <Flame className="w-5 h-5 mr-3 text-orange-500" />
              High Velocity Nodes
            </h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Node Identity</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Archetype</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Acceleration</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Intelligence Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Tems', archetype: 'Global Crossover', growth: '+234%', score: 98.7 },
                  { name: 'Ayra Starr', archetype: 'Street Viral', growth: '+198%', score: 94.2 },
                  { name: 'Rema', archetype: 'Global Crossover', growth: '+156%', score: 96.3 },
                  { name: 'Asake', archetype: 'Street Viral', growth: '+187%', score: 92.8 }
                ].map((n, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-6 px-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-black text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">0{i+1}</div>
                        <span className="font-black text-white">{n.name}</span>
                      </div>
                    </td>
                    <td className="py-6 px-10">
                       <Badge className="bg-blue-500/10 text-blue-400 border-0 text-[8px] font-black uppercase tracking-widest">{n.archetype}</Badge>
                    </td>
                    <td className="py-6 px-10 font-black text-emerald-400">{n.growth}</td>
                    <td className="py-6 px-10">
                       <div className="flex items-center gap-4">
                        <span className="font-black text-white">{n.score}</span>
                        <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-orange-500" style={{ width: `${n.score}%` }} />
                        </div>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
             </table>
          </div>
        </section>
      </div>
    </div>
  )
}