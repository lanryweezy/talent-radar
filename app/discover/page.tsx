'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Calendar, TrendingUp, Users, Music, Play, Star, Heart, Share2, Zap, Globe2, Loader2 } from 'lucide-react'
import ArtistCard from '@/components/enhanced/ArtistCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getTrendingArtists, searchArtists } from '@/lib/api'
import { Artist, TrendingArtistItem } from '@/lib/types'
import { toast } from 'react-hot-toast'

interface DiscoverFilters {
  genre: string
  region: string
  growthRate: string
  followers: string
  breakoutScore: string
  timeframe: string
}

export default function Discover() {
  const [trendingItems, setTrendingItems] = useState<TrendingArtistItem[]>([])
  const [searchResults, setSearchResults] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<DiscoverFilters>({
    genre: 'all',
    region: 'global',
    growthRate: 'all',
    followers: 'all',
    breakoutScore: 'all',
    timeframe: '30d'
  })

  // Fetch trending data
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true)
        const response = await getTrendingArtists(
          filters.region === 'all' ? 'global' : filters.region,
          filters.genre === 'all' ? undefined : filters.genre
        )
        setTrendingItems(response.trending_artists)
      } catch (error) {
        toast.error('Failed to load trending artists')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTrending()
  }, [filters.region, filters.genre])

  // Handle real-time search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([])
        return
      }

      try {
        const searchFilters: any = {}
        if (filters.breakoutScore !== 'all') {
          const [min, max] = filters.breakoutScore.split('-').map(Number)
          searchFilters.min_breakout_score = min
          if (max) searchFilters.max_breakout_score = max
        }
        if (filters.followers !== 'all') {
          const [min] = filters.followers.split('-').map(n => parseInt(n) * 1000000)
          searchFilters.min_followers = min
        }

        const results = await searchArtists(searchQuery, 20, searchFilters)
        setSearchResults(results)
      } catch (error) {
        console.error('Search failed:', error)
      }
    }

    const timer = setTimeout(performSearch, 500)
    return () => clearTimeout(timer)
  }, [searchQuery, filters.breakoutScore, filters.followers])

  const resetFilters = () => {
    setFilters({
      genre: 'all',
      region: 'global',
      growthRate: 'all',
      followers: 'all',
      breakoutScore: 'all',
      timeframe: '30d'
    })
    setSearchQuery('')
  }

  const artistsToDisplay = searchResults.length > 0 ? searchResults : trendingItems.map(item => item.artist)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Scanning Global Markets...</p>
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
                <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">Discovery Engine</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Discovery.</span>
              </h1>
              <p className="text-gray-400 mt-4 text-xl font-medium max-w-xl">
                Find the next big thing before everyone else using our AI-powered discovery tools.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 md:flex-none py-6 px-8"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Advanced Filters'}
              </Button>
              <Button variant="gradient" className="flex-1 md:flex-none py-6 px-8">
                <Zap className="w-4 h-4 mr-2" />
                AI Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Search Bar */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists, genres, tags, or locations across 150+ countries..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <Button
              variant="secondary"
              onClick={resetFilters}
              className="w-full md:w-auto py-4 px-8"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Discovery Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-400 mb-2 block">Primary Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters({...filters, genre: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:ring-1 focus:ring-indigo-500 appearance-none"
                >
                  <option value="all">All Genres</option>
                  <option value="Afrobeats">Afrobeats</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Pop">Pop</option>
                  <option value="Amapiano">Amapiano</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 mb-2 block">Origin Market</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:ring-1 focus:ring-indigo-500 appearance-none"
                >
                  <option value="global">Global</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="ghana">Ghana</option>
                  <option value="south_africa">South Africa</option>
                  <option value="kenya">Kenya</option>
                  <option value="united_states">United States</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 mb-2 block">Growth Velocity</label>
                <select
                  value={filters.growthRate}
                  onChange={(e) => setFilters({...filters, growthRate: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:ring-1 focus:ring-indigo-500 appearance-none"
                >
                  <option value="all">Any Growth</option>
                  <option value="0-50">0-50%</option>
                  <option value="50-100">50-100%</option>
                  <option value="100-200">100-200%</option>
                  <option value="200">200%+</option>
                </select>
              </div>

              <div>
                <label className="label">Followers</label>
                <select
                  value={filters.followers}
                  onChange={(e) => setFilters({...filters, followers: e.target.value})}
                  className="input w-full"
                >
                  <option value="all">Any Size</option>
                  <option value="0-1">0-1M</option>
                  <option value="1-5">1-5M</option>
                  <option value="5-10">5-10M</option>
                  <option value="10">10M+</option>
                </select>
              </div>

              <div>
                <label className="label">Breakout Score</label>
                <select
                  value={filters.breakoutScore}
                  onChange={(e) => setFilters({...filters, breakoutScore: e.target.value})}
                  className="input w-full"
                >
                  <option value="all">Any Score</option>
                  <option value="70-80">70-80</option>
                  <option value="80-90">80-90</option>
                  <option value="90-100">90-100</option>
                </select>
              </div>

              <div>
                <label className="label">Time Frame</label>
                <select
                  value={filters.timeframe}
                  onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                  className="input w-full"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Quick Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'High Velocity', desc: 'Growth peaking', count: trendingItems.filter(i => i.velocity > 0.15).length, icon: TrendingUp, gradient: 'from-green-500/20 to-blue-500/20', border: 'border-green-500/20', color: 'text-green-400' },
            { label: 'Breakout Potential', desc: 'AI predictions', count: trendingItems.filter(i => i.artist.breakout_score > 80).length, icon: Zap, gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20', color: 'text-purple-400' },
            { label: 'Market Matches', desc: 'Discovery results', count: artistsToDisplay.length, icon: Users, gradient: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/20', color: 'text-indigo-400' }
          ].map((cat, i) => (
            <div key={i} className={`bg-gradient-to-br ${cat.gradient} backdrop-blur-xl border ${cat.border} rounded-3xl p-8 group hover:scale-[1.02] transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-black ${cat.color}`}>{cat.label}</h3>
                  <p className="text-gray-400 font-medium mt-1">{cat.desc}</p>
                  <div className="text-4xl font-black mt-4">{cat.count}</div>
                </div>
                <cat.icon className={`w-16 h-16 ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              </div>
            </div>
          ))}
        </div>

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black text-white">
                {searchQuery ? 'Search Results' : 'Trending Intelligence'}
              </h2>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-400">
                {artistsToDisplay.length} Discoveries
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-gray-400 focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer">
                <option>Sort by Score</option>
                <option>Sort by Velocity</option>
                <option>Sort by Reach</option>
              </select>
            </div>
          </div>

          {artistsToDisplay.length === 0 ? (
            <div className="text-center py-24 bg-white/[0.02] rounded-[40px] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">No signals detected</h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">
                Try broadening your discovery parameters or searching for a specific artist.
              </p>
              <Button onClick={resetFilters} variant="outline" className="mt-8 border-white/10">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artistsToDisplay.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {artistsToDisplay.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline">
              Load More Artists
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}