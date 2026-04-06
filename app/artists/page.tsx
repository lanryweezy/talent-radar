'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Filter, Download, Plus, TrendingUp, Star, Music, Globe, Save, Calendar, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Artist } from '@/lib/types'
import { getCRMArtists, updateArtistStatus } from '@/lib/api'

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('breakoutScore')

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getCRMArtists()
        setArtists(data)
        setFilteredArtists(data)
      } catch (error) {
        console.error('Failed to fetch artists:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArtists()
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = artists

    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(artist => artist.status === statusFilter)
    }

    // Sort artists
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'breakoutScore':
          return b.breakout_score - a.breakout_score
        case 'followers':
          return b.followers - a.followers
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredArtists(filtered)
  }, [artists, searchQuery, statusFilter, sortBy])

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

  const handleUpdateStatus = async (artistId: string, status: string) => {
    try {
      const updated = await updateArtistStatus(artistId, { status })
      setArtists(prev => prev.map(a => a.id === artistId ? updated : a))
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleUpdateNotes = async (artistId: string, notes: string) => {
    try {
      const updated = await updateArtistStatus(artistId, { notes })
      setArtists(prev => prev.map(a => a.id === artistId ? updated : a))
    } catch (error) {
      console.error('Failed to update notes:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800'
      case 'watching': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'available': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statusCounts = {
    signed: artists.filter(a => a.status === 'signed').length,
    watching: artists.filter(a => a.status === 'watching').length,
    contacted: artists.filter(a => a.status === 'contacted').length,
    available: artists.filter(a => a.status === 'available').length
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
                <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400">LABEL CRM</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                Artist <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Management.</span>
              </h1>
              <p className="text-gray-400 mt-4 text-xl font-medium max-w-xl">
                Manage your artist roster, track contracts, and store A&R intelligence.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none py-6 px-8">
                <Download className="w-4 h-4 mr-2" />
                Export Data
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
            { label: 'Signed', count: statusCounts.signed, icon: Star, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: 'Watching', count: statusCounts.watching, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Contacted', count: statusCounts.contacted, icon: Music, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { label: 'Available', count: statusCounts.available, icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your roster by name or genre..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="signed">Signed</option>
                <option value="watching">Watching</option>
                <option value="contacted">Contacted</option>
                <option value="available">Available</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-full"
              >
                <option value="breakoutScore">Breakout Score</option>
                <option value="growthRate">Growth Rate</option>
                <option value="followers">Followers</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              {filteredArtists.length} of {artists.length} artists
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Advanced filters</span>
            </div>
          </div>
        </div>

        {/* Artists List */}
        <div className="space-y-8">
          {filteredArtists.map(artist => (
            <div key={artist.id} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all group">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative">
                  <img
                    src={artist.image_url || '/placeholder-artist.png'}
                    alt={artist.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-2xl"
                  />
                  {artist.is_watched && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-lg shadow-lg">
                      <Star className="w-4 h-4 text-black fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Link href={`/artist/${artist.id}`}>
                          <h3 className="text-3xl font-black text-white hover:text-indigo-400 transition-colors">
                            {artist.name}
                          </h3>
                        </Link>
                        <select
                          value={artist.status}
                          onChange={(e) => handleUpdateStatus(artist.id, e.target.value)}
                          className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-none cursor-pointer ${
                            artist.status === 'signed' ? 'bg-green-500/20 text-green-400' :
                            artist.status === 'watching' ? 'bg-blue-500/20 text-blue-400' :
                            artist.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-white/10 text-gray-400'
                          }`}
                        >
                          <option value="signed">Signed</option>
                          <option value="watching">Watching</option>
                          <option value="contacted">Contacted</option>
                          <option value="available">Available</option>
                        </select>
                      </div>
                      <p className="text-gray-400 font-medium flex items-center mt-2">
                        <Music className="w-4 h-4 mr-2 text-indigo-400" />
                        {artist.genres.join(', ')}
                      </p>
                      {artist.status === 'signed' && artist.signed_date && (
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-sm font-bold text-green-400 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Signed {new Date(artist.signed_date).toLocaleDateString()}
                          </p>
                          {artist.contract_value && (
                            <p className="text-sm font-bold text-indigo-400">
                              {formatCurrency(artist.contract_value)} Contract
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4">
                      <div className="text-center sm:text-right">
                        <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {artist.breakout_score.toFixed(1)}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Breakout Score</div>
                      </div>
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
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Market Trend</div>
                      <div className={`text-xl font-bold flex items-center ${artist.trend_direction === 'up' ? 'text-green-400' : 'text-gray-400'}`}>
                        {artist.trend_direction === 'up' && <TrendingUp className="w-5 h-5 mr-2" />}
                        {artist.trend_direction.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                      <Sparkles className="w-3 h-3 mr-2 text-indigo-400" />
                      A&R Intelligence
                    </label>
                    <textarea
                      defaultValue={artist.notes || ''}
                      onBlur={(e) => handleUpdateNotes(artist.id, e.target.value)}
                      placeholder="Enter private label intelligence, meeting notes, or scout observations..."
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-300 placeholder-gray-600 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-white/5 gap-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Scouted {new Date(artist.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <Link href={`/artist/${artist.id}`} className="flex-1 sm:flex-none">
                        <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-widest py-5">
                          View Full Deep Dive
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add New Artist
            </button>
          </div>
        )}
      </div>
    </div>
  )
}