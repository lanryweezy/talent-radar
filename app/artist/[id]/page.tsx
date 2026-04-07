'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, ExternalLink, TrendingUp, Users, Music, Globe, Star, Heart, Share2, Calendar, Target, Zap, BarChart3, Info, ShieldCheck, Flame, Layers } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getArtistDetails, getArtistTracks, getGrowthAnalytics, updateArtistStatus, getSimilarArtists } from '@/lib/api'
import { Artist, Track } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

export default function ArtistProfile() {
  const params = useParams()
  const artistId = params.id as string
  const [artist, setArtist] = useState<Artist | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [similarArtists, setSimilarArtists] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [details, artistTracks, growthData, similarData] = await Promise.all([
          getArtistDetails(artistId),
          getArtistTracks(artistId),
          getGrowthAnalytics(artistId),
          getSimilarArtists(artistId, 3)
        ])
        setArtist(details)
        setTracks(artistTracks)
        setAnalytics(growthData)
        setSimilarArtists(similarData.similar_artists)
      } catch (error) {
        console.error('Failed to fetch artist data:', error)
        toast.error('Failed to load artist details')
      } finally {
        setIsLoading(false)
      }
    }

    if (artistId) {
      fetchData()
    }
  }, [artistId])

  const handleToggleWatchlist = async () => {
    if (!artist) return
    try {
      const updated = await updateArtistStatus(artist.id, { is_watched: !artist.is_watched })
      setArtist(updated)
      toast.success(updated.is_watched ? 'Added to watchlist' : 'Removed from watchlist')
    } catch (error) {
      toast.error('Update failed')
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><Zap className="w-12 h-12 text-orange-500 animate-pulse" /></div>

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Precision Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Intelligence Console</span>
          </Link>
          <div className="flex items-center space-x-3">
            <button onClick={handleToggleWatchlist} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Heart className={`w-5 h-5 ${artist?.is_watched ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            </button>
            <Button variant="gradient" size="sm" className="rounded-full px-6">
              Sign Artist
            </Button>
          </div>
        </div>
      </nav>

      {/* Profile Hero */}
      <div className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all" />
              <img
                src={artist?.image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'}
                alt={artist?.name}
                className="w-72 h-72 rounded-[40px] object-cover border border-white/10 shadow-2xl relative z-10"
              />
              {artist?.breakout_score > 80 && (
                <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-2xl shadow-xl z-20">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
              )}
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                  {artist?.genres[0] || 'Unknown'}
                </Badge>
                {artist?.archetype && (
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                    {artist.archetype}
                  </Badge>
                )}
                <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <Globe className="w-3 h-3 mr-1.5" />
                  {artist?.country || 'Global'}
                </div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-10"
              >
                {artist?.name}
              </motion.h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px]">
                {[
                  { label: 'Market Reach', value: formatNumber(artist?.followers || 0), color: 'text-white' },
                  { label: 'Popularity', value: `${artist?.popularity}%`, color: 'text-orange-400' },
                  { label: 'Growth Delta', value: `+${analytics?.total_growth || 0}%`, color: 'text-emerald-400' },
                  { label: 'Talent Score', value: artist?.breakout_score?.toFixed(1), color: 'gradient-text-gold' }
                ].map((stat, i) => (
                  <div key={i} className="px-6 py-4 border-r border-white/5 last:border-0 text-center lg:text-left">
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Tabs */}
      <div className="sticky top-[73px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-10 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Strategic Intel', icon: Zap },
              { id: 'analytics', label: 'Growth Engine', icon: BarChart3 },
              { id: 'tracks', label: 'Content Analysis', icon: Music },
              { id: 'predictions', label: 'Future Velocity', icon: Target },
              { id: 'similar', label: 'Discovery Nodes', icon: Users },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-5 flex items-center space-x-2 border-b-2 font-black uppercase tracking-widest text-[10px] whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Pane */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section className="glass-card rounded-[40px] p-10 border border-white/5">
                <h3 className="text-xl font-black mb-8 flex items-center uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 mr-3 text-orange-500" />
                  Executive Summary
                </h3>
                <p className="text-2xl text-slate-300 font-medium leading-relaxed mb-8">
                  {artist?.name} is exhibiting <span className="text-orange-400 font-black">Supernova</span> growth characteristics.
                  Our models detect a high degree of cultural pull in the <span className="text-white font-black">{artist?.genres[0]}</span> ecosystem,
                  with a breakout probability of <span className="text-orange-400 font-black">{analytics?.breakout_probability || '85'}%</span> over the next 90 days.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Momentum Phase</div>
                    <div className="text-xl font-black text-orange-400">High Velocity Breakout</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Market Sentiment</div>
                    <div className="text-xl font-black text-blue-400">Strong Cultural Pull</div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card rounded-[32px] p-8 border border-white/5">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Strategic Intelligence</h4>
                  <ul className="space-y-4">
                    {artist?.strategic_intelligence?.map((intel: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-3" />
                        <span className="text-sm font-bold text-slate-300">{intel}</span>
                      </li>
                    )) || (
                      <li className="text-sm font-bold text-slate-500 italic">No specific intelligence available.</li>
                    )}
                  </ul>
                </div>
                <div className="glass-card rounded-[32px] p-8 border border-white/5">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Competitive Moat</h4>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                    <div className="text-xs font-bold text-orange-400 mb-1">Niche Authority</div>
                    <div className="text-2xl font-black text-white">Top 2%</div>
                    <p className="text-[10px] text-slate-500 mt-2">Dominating the {artist?.genres[0]} sub-genre across local markets.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-[32px] p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Platform Velocity</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Spotify', value: 'Trending', color: 'bg-emerald-500' },
                    { label: 'TikTok', value: 'Viral', color: 'bg-rose-500' },
                    { label: 'YouTube', value: 'Steady', color: 'bg-red-600' },
                    { label: 'Instagram', value: 'High', color: 'bg-purple-500' }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-300">{p.label}</span>
                      <Badge className={`${p.color} text-white border-0 text-[9px] font-black px-2.5`}>{p.value}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain largely similar but with tighter styling */}
        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Acceleration Delta', value: `+${analytics?.acceleration_delta || 0}%`, detail: 'Velocity change (MoM)', icon: Flame },
                { label: 'Projected Reach', value: formatNumber(artist?.followers * 1.4), detail: 'Next 30 days', icon: Target },
                { label: 'Engagement Index', value: '8.4/10', detail: 'Cross-platform average', icon: Zap }
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-3xl p-8 border border-white/5">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                    <stat.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-600">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... (Implement other tabs similarly) ... */}
        {activeTab === 'tracks' && (
          <div className="grid gap-4">
             {tracks.map((track, i) => (
              <div key={track.id} className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:border-orange-500/20 transition-all border border-white/5">
                <div className="text-xl font-black text-slate-700 w-8">{i + 1}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{track.name}</h4>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{track.album_name || 'Single'}</div>
                </div>
                <div className="hidden md:flex items-center gap-12">
                   <div className="text-right">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Viral Rank</div>
                    <div className="text-sm font-black text-orange-400">#{(track.viral_potential || 0).toFixed(0)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Energy</div>
                    <div className="text-sm font-black text-blue-400">{(track.energy * 100).toFixed(0)}%</div>
                  </div>
                </div>
                <button className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-orange-500 hover:border-orange-400 transition-all group-hover:scale-105">
                  <Play className="w-5 h-5 fill-current text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}