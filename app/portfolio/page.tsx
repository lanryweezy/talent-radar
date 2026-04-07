'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, TrendingUp, DollarSign, Target, PieChart,
  ArrowUpRight, BarChart3, Calendar, Download, Plus,
  Star, Users, ShieldCheck, Activity, Globe
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getCRMArtists } from '@/lib/api'
import { Artist } from '@/lib/types'
import { formatNumber, formatCurrency } from '@/lib/utils'

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const data = await getCRMArtists('signed')
        setPortfolio(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const totalContractValue = portfolio.reduce((sum, a) => sum + (a.contract_value || 0), 0)
  const avgBreakoutScore = portfolio.length > 0
    ? portfolio.reduce((sum, a) => sum + a.breakout_score, 0) / portfolio.length
    : 0

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Activity className="w-12 h-12 text-orange-500 animate-spin" /></div>

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-20 pb-12 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1">Portfolio Management</Badge>
                <div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   Live Asset Tracking
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                A&R <br />
                <span className="gradient-text-gold italic">Portfolio.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Aggregated performance metrics and ROI projections for your signed roster.
              </p>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-3xl">
              <Button variant="outline" className="rounded-xl px-6 border-white/5 bg-white/5">
                <Download className="w-4 h-4 mr-2" />
                Report
              </Button>
              <Button variant="gradient" className="rounded-xl px-6">
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
           {[
            { label: 'Asset Value', value: formatCurrency(totalContractValue), change: '+14.2%', icon: DollarSign, color: 'text-emerald-400' },
            { label: 'Roster Velocity', value: `+${(avgBreakoutScore/10).toFixed(1)}x`, change: 'Accelerating', icon: TrendingUp, color: 'text-orange-400' },
            { label: 'Avg Intelligence', value: avgBreakoutScore.toFixed(1), change: 'High', icon: ShieldCheck, color: 'text-blue-400' },
            { label: 'Market Nodes', value: portfolio.length, change: 'Stable', icon: Globe, color: 'text-purple-400' }
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

        {/* Portfolio Table */}
        <section className="glass-card rounded-[40px] overflow-hidden border border-white/5">
           <div className="p-10 border-b border-white/5 flex justify-between items-center">
             <h3 className="text-xl font-black flex items-center uppercase tracking-widest">
              <Briefcase className="w-5 h-5 mr-3 text-orange-500" />
              Active Roster Intelligence
            </h3>
            <div className="flex gap-2">
               <Badge className="bg-white/5 text-slate-400 border-white/10 text-[9px] font-black uppercase">Sorted by ROI</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Artist Asset</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Contract Value</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Growth Multiple</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Portfolio Status</th>
                  <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((artist, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="py-6 px-10">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                           <Image src={artist.image_url || '/placeholder.png'} alt={artist.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-black text-white">{artist.name}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{artist.genres[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-10 font-black text-white">{formatCurrency(artist.contract_value || 0)}</td>
                    <td className="py-6 px-10">
                       <div className="flex items-center gap-2">
                         <span className="font-black text-emerald-400">{(artist.breakout_score / 20).toFixed(1)}x</span>
                         <TrendingUp className="w-3 h-3 text-emerald-400" />
                       </div>
                    </td>
                    <td className="py-6 px-10">
                       <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[8px] font-black uppercase tracking-widest">Performing</Badge>
                    </td>
                    <td className="py-6 px-10">
                       <Link href={`/artist/${artist.id}`}>
                         <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white">
                           <ArrowUpRight className="w-4 h-4" />
                         </Button>
                       </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
             </table>
          </div>
          {portfolio.length === 0 && (
            <div className="py-20 text-center">
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No signed artists in portfolio.</p>
               <Link href="/discover">
                 <Button variant="ghost" className="mt-4 text-orange-500">Start Scouting</Button>
               </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
