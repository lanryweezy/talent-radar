'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Calendar, TrendingUp, Users, Music, Play, Star, Heart, Share2, Zap } from 'lucide-react'
import ArtistCard from '@/components/ArtistCard'

interface DiscoverFilters {
  genre: string
  country: string
  growthRate: string
  followers: string
  breakoutScore: string
  platforms: string[]
  timeframe: string
}

interface Artist {
  id: string
  name: string
  image: string
  genre: string
  country: string
  followers: number
  monthlyListeners: number
  growthRate: number
  breakoutScore: number
  platforms: string[]
  topTrack: string
  recentActivity: string
  isRising: boolean
  isNew: boolean
  tags: string[]
}

export default function Discover() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<DiscoverFilters>({
    genre: 'all',
    country: 'all',
    growthRate: 'all',
    followers: 'all',
    breakoutScore: 'all',
    platforms: [],
    timeframe: '30d'
  })

  // Mock discovery data
  useEffect(() => {
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Shallipopi',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 780000,
        monthlyListeners: 1600000,
        growthRate: 245.6,
        breakoutScore: 85.7,
        platforms: ['Spotify', 'Audiomack', 'Boomplay'],
        topTrack: 'Elon Musk',
        recentActivity: 'Breakthrough single',
        isRising: true,
        isNew: true,
        tags: ['Viral', 'Street Pop', 'Rising']
      },
      {
        id: '2',
        name: 'Seyi Vibez',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 920000,
        monthlyListeners: 2100000,
        growthRate: 189.3,
        breakoutScore: 88.4,
        platforms: ['Spotify', 'Apple Music', 'Audiomack'],
        topTrack: 'Chance (Na Ham)',
        recentActivity: 'Album release',
        isRising: true,
        isNew: false,
        tags: ['Street Hop', 'Melodic', 'Trending']
      },
      {
        id: '3',
        name: 'Young Jonn',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 650000,
        monthlyListeners: 1400000,
        growthRate: 167.8,
        breakoutScore: 82.1,
        platforms: ['Spotify', 'Apple Music', 'Boomplay'],
        topTrack: 'Dada',
        recentActivity: 'Producer turned artist',
        isRising: true,
        isNew: false,
        tags: ['Producer', 'Versatile', 'Hit Maker']
      },
      {
        id: '4',
        name: 'Asake',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 2800000,
        monthlyListeners: 5200000,
        growthRate: 298.7,
        breakoutScore: 96.8,
        platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
        topTrack: 'Sungba',
        recentActivity: 'International breakthrough',
        isRising: false,
        isNew: false,
        tags: ['Amapiano', 'Global', 'Chart Topper']
      },
      {
        id: '5',
        name: 'Omah Lay',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 3100000,
        monthlyListeners: 6800000,
        growthRate: 156.2,
        breakoutScore: 94.5,
        platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
        topTrack: 'Understand',
        recentActivity: 'Grammy consideration',
        isRising: false,
        isNew: false,
        tags: ['Alternative', 'Soulful', 'International']
      },
      {
        id: '6',
        name: 'Victony',
        image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 890000,
        monthlyListeners: 1900000,
        growthRate: 234.1,
        breakoutScore: 87.9,
        platforms: ['Spotify', 'Apple Music', 'Audiomack'],
        topTrack: 'Holy Father',
        recentActivity: 'Collaboration surge',
        isRising: true,
        isNew: false,
        tags: ['Melodic', 'Versatile', 'Collaborator']
      },
      {
        id: '7',
        name: 'Kizz Daniel',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 4200000,
        monthlyListeners: 8900000,
        growthRate: 89.4,
        breakoutScore: 92.3,
        platforms: ['Spotify', 'Apple Music', 'Boomplay'],
        topTrack: 'Buga',
        recentActivity: 'Global viral hit',
        isRising: false,
        isNew: false,
        tags: ['Established', 'Viral', 'Dance']
      },
      {
        id: '8',
        name: 'Ruger',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 1200000,
        monthlyListeners: 2600000,
        growthRate: 198.5,
        breakoutScore: 89.7,
        platforms: ['Spotify', 'Apple Music', 'Audiomack'],
        topTrack: 'Bounce',
        recentActivity: 'Consistent releases',
        isRising: true,
        isNew: false,
        tags: ['Energetic', 'Consistent', 'Youth Favorite']
      }
    ]

    setTimeout(() => {
      setArtists(mockArtists)
      setFilteredArtists(mockArtists)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = artists

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Genre filter
    if (filters.genre !== 'all') {
      filtered = filtered.filter(artist => artist.genre === filters.genre)
    }

    // Country filter
    if (filters.country !== 'all') {
      filtered = filtered.filter(artist => artist.country === filters.country)
    }

    // Growth rate filter
    if (filters.growthRate !== 'all') {
      const [min, max] = filters.growthRate.split('-').map(Number)
      filtered = filtered.filter(artist => {
        if (max) return artist.growthRate >= min && artist.growthRate <= max
        return artist.growthRate >= min
      })
    }

    // Followers filter
    if (filters.followers !== 'all') {
      const [min, max] = filters.followers.split('-').map(n => parseInt(n) * 1000000)
      filtered = filtered.filter(artist => {
        if (max) return artist.followers >= min && artist.followers <= max
        return artist.followers >= min
      })
    }

    // Breakout score filter
    if (filters.breakoutScore !== 'all') {
      const [min, max] = filters.breakoutScore.split('-').map(Number)
      filtered = filtered.filter(artist => {
        if (max) return artist.breakoutScore >= min && artist.breakoutScore <= max
        return artist.breakoutScore >= min
      })
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(artist =>
        filters.platforms.some(platform => artist.platforms.includes(platform))
      )
    }

    setFilteredArtists(filtered)
  }, [artists, searchQuery, filters])

  const resetFilters = () => {
    setFilters({
      genre: 'all',
      country: 'all',
      growthRate: 'all',
      followers: 'all',
      breakoutScore: 'all',
      platforms: [],
      timeframe: '30d'
    })
    setSearchQuery('')
  }

  const risingArtists = filteredArtists.filter(artist => artist.isRising)
  const newArtists = filteredArtists.filter(artist => artist.isNew)

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Artists</h1>
              <p className="text-gray-600 mt-1">Find the next big thing before everyone else</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="btn btn-primary">
                <Zap className="w-4 h-4 mr-2" />
                AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists, genres, tags, or locations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={resetFilters}
              className="btn btn-outline"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="label">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters({...filters, genre: e.target.value})}
                  className="input w-full"
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
                <label className="label">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters({...filters, country: e.target.value})}
                  className="input w-full"
                >
                  <option value="all">All Countries</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Kenya">Kenya</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              <div>
                <label className="label">Growth Rate</label>
                <select
                  value={filters.growthRate}
                  onChange={(e) => setFilters({...filters, growthRate: e.target.value})}
                  className="input w-full"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Rising Stars</h3>
                <p className="text-green-100">Artists on the rise</p>
                <div className="text-2xl font-bold mt-2">{risingArtists.length}</div>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">New Discoveries</h3>
                <p className="text-purple-100">Fresh talent</p>
                <div className="text-2xl font-bold mt-2">{newArtists.length}</div>
              </div>
              <Star className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Total Found</h3>
                <p className="text-orange-100">Matching criteria</p>
                <div className="text-2xl font-bold mt-2">{filteredArtists.length}</div>
              </div>
              <Users className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Rising Stars Section */}
        {risingArtists.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Rising Stars
              </h2>
              <span className="text-sm text-gray-600">{risingArtists.length} artists</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {risingArtists.slice(0, 6).map(artist => (
                <div key={artist.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                    Rising
                  </div>
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Discoveries Section */}
        {newArtists.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 mr-2 text-purple-600" />
                New Discoveries
              </h2>
              <span className="text-sm text-gray-600">{newArtists.length} artists</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArtists.slice(0, 6).map(artist => (
                <div key={artist.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                    New
                  </div>
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Results</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{filteredArtists.length} artists found</span>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Sort by Breakout Score</option>
                <option>Sort by Growth Rate</option>
                <option>Sort by Followers</option>
                <option>Sort by Recent Activity</option>
              </select>
            </div>
          </div>

          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
              <button onClick={resetFilters} className="btn btn-primary">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredArtists.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn btn-outline">
              Load More Artists
            </button>
          </div>
        )}
      </div>
    </div>
  )
}