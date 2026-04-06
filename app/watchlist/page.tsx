'use client'

import { useState, useEffect } from 'react'
import { Star, TrendingUp, TrendingDown, AlertCircle, Calendar, Filter, Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Artist } from '@/lib/types'
import { getWatchlist, updateArtistStatus } from '@/lib/api'

export default function Watchlist() {
  const [watchlistArtists, setWatchlistArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('dateAdded')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist()
        setWatchlistArtists(data)
      } catch (error) {
        console.error('Failed to fetch watchlist:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWatchlist()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const sortedArtists = [...watchlistArtists].sort((a, b) => {
    switch (sortBy) {
      case 'breakoutScore':
        return b.breakout_score - a.breakout_score
      case 'popularity':
        return b.popularity - a.popularity
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  const filteredArtists = sortedArtists.filter(artist => {
    if (filterBy === 'signed') return artist.status === 'signed'
    if (filterBy === 'available') return artist.status === 'available'
    return true
  })

  const handleRemoveFromWatchlist = async (artistId: string) => {
    try {
      await updateArtistStatus(artistId, { is_watched: false })
      setWatchlistArtists(prev => prev.filter(a => a.id !== artistId))
    } catch (error) {
      console.error('Failed to remove from watchlist:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400 font-bold uppercase tracking-widest text-[10px]">Priority Watch</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Watchlist.</span>
              </h1>
              <p className="text-gray-400 mt-4 text-xl font-medium max-w-xl">
                Track emerging breakout artists and receive real-time intelligence alerts.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none py-6 px-8">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" className="flex-1 md:flex-none py-6 px-8">
                <Plus className="w-4 h-4 mr-2" />
                Add Artist
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Tracked', count: watchlistArtists.length, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { label: 'Signed Artists', count: watchlistArtists.filter(a => a.status === 'signed').length, icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Avg Breakout', count: (watchlistArtists.reduce((sum, a) => sum + a.breakout_score, 0) / (watchlistArtists.length || 1)).toFixed(1), icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: 'Avg Popularity', count: (watchlistArtists.reduce((sum, a) => sum + a.popularity, 0) / (watchlistArtists.length || 1)).toFixed(1), icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Sort by Intelligence</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-400"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="popularity">Popularity</option>
                  <option value="breakoutScore">Breakout Score</option>
                </select>
              </div>
              <div>
                <label className="label">Filter by</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="input"
                >
                  <option value="all">All Artists</option>
                  <option value="signed">Signed</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredArtists.length} of {watchlistArtists.length} artists
            </div>
          </div>
        </div>

        {/* Artists List */}
        <div className="space-y-8">
          {filteredArtists.map(artist => (
            <div key={artist.id} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all group">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <img
                  src={artist.image_url || '/placeholder-artist.png'}
                  alt={artist.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-2xl"
                />
                
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-white">{artist.name}</h3>
                      <p className="text-gray-400 font-medium mt-1">{artist.genres.join(', ')}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Added {new Date(artist.created_at).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center sm:text-right">
                        <div className="text-3xl font-black text-yellow-400">{artist.breakout_score.toFixed(1)}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Score</div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveFromWatchlist(artist.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2"
                      >
                        <TrendingDown className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 border-y border-white/5 py-6">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Followers</div>
                      <div className="text-xl font-bold">{formatNumber(artist.followers)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Popularity</div>
                      <div className="text-xl font-bold">{artist.popularity}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Status</div>
                      <div className="text-xl font-bold uppercase text-indigo-400">{artist.status}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Market Trend</div>
                      <div className="text-xl font-bold uppercase text-green-400">{artist.trend_direction}</div>
                    </div>
                  </div>
                  
                  {artist.notes && (
                    <div className="mt-8 p-4 bg-yellow-400/5 border border-yellow-400/10 rounded-2xl">
                      <div className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-2 flex items-center">
                        <Star className="w-3 h-3 mr-2 fill-current" />
                        A&R Intelligence Note
                      </div>
                      <div className="text-gray-300 text-sm leading-relaxed">{artist.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists in watchlist</h3>
            <p className="text-gray-600 mb-4">Start building your watchlist by discovering new talent.</p>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Artist
            </button>
          </div>
        )}
      </div>
    </div>
  )
}