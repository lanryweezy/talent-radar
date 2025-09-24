'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Filter, Download, Plus, TrendingUp, Star, Music, Globe } from 'lucide-react'
import Link from 'next/link'
import ArtistCard from '@/components/ArtistCard'

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
  status: 'signed' | 'watching' | 'contacted' | 'available'
  signedDate?: string
  contractValue?: number
  notes: string
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('breakoutScore')

  useEffect(() => {
    // Mock artists data with different statuses
    const mockArtists: Artist[] = [
      {
        id: '1',
        name: 'Tems',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 3400000,
        monthlyListeners: 8900000,
        growthRate: 234.5,
        breakoutScore: 98.7,
        platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Audiomack'],
        topTrack: 'Free Mind',
        recentActivity: 'Grammy nomination',
        status: 'signed',
        signedDate: '2023-06-15',
        contractValue: 2500000,
        notes: 'Exceptional talent with global appeal. Grammy-nominated artist with strong international presence.'
      },
      {
        id: '2',
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
        status: 'watching',
        notes: 'Rising star with viral potential. Strong street credibility and growing fanbase.'
      },
      {
        id: '3',
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
        status: 'contacted',
        notes: 'Versatile artist with strong collaboration network. Initial contact made through management.'
      },
      {
        id: '4',
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
        status: 'available',
        notes: 'Talented producer-artist with proven hit-making ability. Open to label discussions.'
      },
      {
        id: '5',
        name: 'Ayra Starr',
        image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400',
        genre: 'Afrobeats',
        country: 'Nigeria',
        followers: 2100000,
        monthlyListeners: 4500000,
        growthRate: 198.2,
        breakoutScore: 91.8,
        platforms: ['Spotify', 'Apple Music', 'Boomplay', 'Audiomack'],
        topTrack: 'Rush',
        recentActivity: 'International tour announced',
        status: 'signed',
        signedDate: '2023-03-20',
        contractValue: 1800000,
        notes: 'Young superstar with massive potential. Already showing international crossover appeal.'
      }
    ]

    setTimeout(() => {
      setArtists(mockArtists)
      setFilteredArtists(mockArtists)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = artists

    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(artist => artist.status === statusFilter)
    }

    // Sort artists
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'breakoutScore':
          return b.breakoutScore - a.breakoutScore
        case 'growthRate':
          return b.growthRate - a.growthRate
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Artist Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your artist roster and track their progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="btn btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Artist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Signed Artists</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.signed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Watching</p>
                  <p className="text-2xl font-bold text-blue-600">{statusCounts.watching}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Contacted</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.contacted}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-600">{statusCounts.available}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artists..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-full"
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
        <div className="space-y-6">
          {filteredArtists.map(artist => (
            <div key={artist.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <Link href={`/artist/${artist.id}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {artist.name}
                          </h3>
                        </Link>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artist.status)}`}>
                          {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Music className="w-4 h-4 mr-1" />
                        {artist.genre} • 
                        <Globe className="w-4 h-4 ml-2 mr-1" />
                        {artist.country}
                      </p>
                      {artist.status === 'signed' && artist.signedDate && (
                        <p className="text-sm text-green-600 mt-1">
                          Signed: {new Date(artist.signedDate).toLocaleDateString()}
                          {artist.contractValue && ` • ${formatCurrency(artist.contractValue)}`}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold">{artist.breakoutScore}/100</div>
                        <div className="text-sm text-gray-600">Breakout Score</div>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-gray-600">Followers</div>
                      <div className="font-semibold">{formatNumber(artist.followers)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Monthly Listeners</div>
                      <div className="font-semibold">{formatNumber(artist.monthlyListeners)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Growth Rate</div>
                      <div className="font-semibold text-green-600">+{artist.growthRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Top Track</div>
                      <div className="font-semibold">{artist.topTrack}</div>
                    </div>
                  </div>
                  
                  {artist.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-700">{artist.notes}</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Recent: {artist.recentActivity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {artist.status !== 'signed' && (
                        <button className="btn btn-primary btn-sm">
                          Sign Artist
                        </button>
                      )}
                      <Link href={`/artist/${artist.id}`}>
                        <button className="btn btn-outline btn-sm">
                          View Details
                        </button>
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