'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play, ExternalLink, TrendingUp, Users, Music, Globe, Star, Heart, Share2, Calendar, Target, Zap, BarChart3, Info } from 'lucide-react'
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Artist not found</h2>
          <p className="text-gray-600 mb-4">The artist you're looking for doesn't exist.</p>
          <Link href="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-20 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-[10px]">Back to Intelligence</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10" onClick={handleToggleWatchlist}>
                <Heart className={`w-4 h-4 mr-2 ${artist?.is_watched ? 'fill-red-500 text-red-500' : ''}`} />
                Watchlist
              </Button>
              <Button variant="gradient" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Sign Artist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Hero */}
      <div className="relative z-10 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img
                src={artist?.image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'}
                alt={artist?.name}
                className="w-64 h-64 rounded-3xl object-cover shadow-2xl relative z-10 border border-white/10"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 py-1">
                  {artist?.genres[0] || 'Unknown Genre'}
                </Badge>
                <div className="flex items-center text-gray-400 text-sm font-medium">
                  <Globe className="w-4 h-4 mr-2 text-indigo-400" />
                  Global Origin
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.8] mb-8">
                {artist?.name}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 p-8 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl">
                <div>
                  <div className="text-3xl font-black">{formatNumber(artist?.followers || 0)}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Reach</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-indigo-400">{artist?.popularity}%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Popularity</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-green-400">+{analytics?.follower_growth ? (analytics.follower_growth * 100).toFixed(1) : 0}%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Growth Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {artist?.breakout_score.toFixed(1)}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Breakout Score</div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                <Button variant="gradient" className="py-7 px-10 text-lg">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Stream Top Track
                </Button>
                <a href={artist?.spotify_url || '#'} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="py-7 px-10 text-lg border-white/10 hover:bg-white/5">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Spotify Profile
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-20 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-12">
            {[
              { id: 'overview', label: 'Market Pulse', icon: Zap },
              { id: 'analytics', label: 'Growth Data', icon: BarChart3 },
              { id: 'tracks', label: 'Content Analysis', icon: Music },
              { id: 'predictions', label: 'A&R Intelligence', icon: Target },
              { id: 'similar', label: 'Related Breakthroughs', icon: Users },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-6 flex items-center space-x-2 border-b-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
                <h3 className="text-2xl font-black mb-6 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-indigo-400" />
                  Market Intelligence
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-gray-400 leading-relaxed font-medium">
                    {artist?.name} is showing exceptional velocity in the global {artist?.genres[0]} market.
                    Current engagement rates exceed benchmarks by 45%, driven by a significant viral presence
                    across emerging social platforms.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Market Trend</div>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-8 h-8 mr-3" />
                    <span className="text-3xl font-black">Accelerating</span>
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Discovery Source</div>
                  <div className="flex items-center text-indigo-400">
                    <Zap className="w-8 h-8 mr-3" />
                    <span className="text-3xl font-black">AI Triggered</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[40px] p-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6">Social Footprint</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-pink-400" />
                      </div>
                      <span className="font-bold">Instagram</span>
                    </div>
                    <span className="font-black">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Share2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="font-bold">TikTok</span>
                    </div>
                    <span className="font-black text-indigo-400">Viral</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: 'Weekly Velocity', value: `+${analytics?.weekly_growth || 0}%`, icon: TrendingUp, color: 'text-green-400' },
              { label: 'Stream Momentum', value: `+${(analytics?.stream_growth * 100).toFixed(1) || 0}%`, icon: Zap, color: 'text-indigo-400' },
              { label: 'Market Cap', value: formatNumber(artist?.followers || 0), icon: Users, color: 'text-purple-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</div>
                <div className="text-4xl font-black mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tracks' && (
          <div className="space-y-6">
            {tracks.map((track, i) => (
              <div key={track.id} className="group bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex items-center gap-8 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl font-black text-indigo-400">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black">{track.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-gray-400 font-medium">
                    <span>{track.album_name || 'Single'}</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span>Popularity: {track.popularity}%</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-12">
                  <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Viral Risk</div>
                    <div className="text-xl font-black text-indigo-400">{(track.viral_potential || 0).toFixed(0)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Energy</div>
                    <div className="text-xl font-black text-green-400">{(track.energy * 100).toFixed(0)}%</div>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full w-14 h-14 p-0 bg-white/5 border-white/10">
                  <Play className="w-5 h-5 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'similar' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarArtists.map((item, i) => (
              <div key={i} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden group">
                <div className="relative h-48">
                  <img src={item.artist.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="font-black text-xl">{item.artist.name}</div>
                    <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{Math.round(item.similarity_score * 100)}% Match</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Similarity Nodes</div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.similarity_reasons.map((reason: string, j: number) => (
                      <Badge key={j} variant="outline" className="bg-white/5 border-white/10 text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/artist/${item.artist.id}`}>
                    <Button variant="outline" className="w-full border-white/10">View Analysis</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
              <h3 className="text-2xl font-black mb-10 flex items-center">
                <Target className="w-6 h-6 mr-3 text-indigo-400" />
                Breakout Probability
              </h3>

              <div className="relative pt-12 pb-8">
                <div className="text-9xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
                  {artist?.breakout_score.toFixed(0)}%
                </div>
                <div className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 mt-4">
                  AI-Confidence: High
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10">
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-gray-500 text-sm">Strategic Recommendations</h3>
                <div className="space-y-4">
                  {[
                    "Initiate priority signing discussion",
                    "Optimize global distribution strategy",
                    "Target Tier-1 playlist ecosystems",
                    "Amplify cross-market social velocity"
                  ].map((action, i) => (
                    <div key={i} className="flex items-center p-5 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 text-xs font-black text-indigo-400">
                        {i + 1}
                      </div>
                      <span className="font-bold text-gray-200">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}