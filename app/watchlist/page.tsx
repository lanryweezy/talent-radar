'use client'

import { useState, useEffect } from 'react'
import { Star, TrendingUp, TrendingDown, AlertCircle, Calendar, Filter, Download, Plus } from 'lucide-react'
import ArtistCard from '@/components/ArtistCard'

interface WatchlistArtist {
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
  dateAdded: string
  alerts: Array<{
    type: 'growth' | 'milestone' | 'activity'
    message: string
    date: string
  }>
  priceChange: number
  marketValue: number
}

export default function Watchlist() {
  const [watchlistArtists, setWatchlistArtists] = useState<WatchlistArtist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('dateAdded')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    // Mock watchlist data
    const mockWatchlist: WatchlistArtist[] = [
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
        dateAdded: '2024-01-15',
        alerts: [
          { type: 'growth', message: 'Growth rate increased by 45%', date: '2024-01-20' },
          { type: 'milestone', message: 'Reached 1M monthly listeners', date: '2024-01-18' }
        ],
        priceChange: 23.5,
        marketValue: 150000
      },
      {
        id: '2',
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
        dateAdded: '2024-01-10',
        alerts: [
          { type: 'activity', message: 'New collaboration announced', date: '2024-01-22' },
          { type: 'growth', message: 'TikTok followers surged 67%', date: '2024-01-19' }
        ],
        priceChange: 18.2,
        marketValue: 180000
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
        dateAdded: '2024-01-05',
        alerts: [
          { type: 'milestone', message: 'First international playlist feature', date: '2024-01-21' }
        ],
        priceChange: -5.3,
        marketValue: 120000
      }
    ]

    setTimeout(() => {
      setWatchlistArtists(mockWatchlist)
      setIsLoading(false)
    }, 1000)
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
      case 'growthRate':
        return b.growthRate - a.growthRate
      case 'breakoutScore':
        return b.breakoutScore - a.breakoutScore
      case 'marketValue':
        return b.marketValue - a.marketValue
      case 'priceChange':
        return b.priceChange - a.priceChange
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  const filteredArtists = sortedArtists.filter(artist => {
    if (filterBy === 'rising') return artist.priceChange > 0
    if (filterBy === 'declining') return artist.priceChange < 0
    if (filterBy === 'alerts') return artist.alerts.length > 0
    return true
  })

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
                <Star className="w-8 h-8 mr-3 text-yellow-500" />
                Watchlist
              </h1>
              <p className="text-gray-600 mt-1">Track your favorite artists and get real-time alerts</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
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
                  <p className="text-sm text-gray-600">Total Artists</p>
                  <p className="text-2xl font-bold">{watchlistArtists.length}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold">
                    {watchlistArtists.reduce((sum, artist) => sum + artist.alerts.length, 0)}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Portfolio Value</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(watchlistArtists.reduce((sum, artist) => sum + artist.marketValue, 0))}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Growth</p>
                  <p className="text-2xl font-bold text-green-600">
                    +{(watchlistArtists.reduce((sum, artist) => sum + artist.growthRate, 0) / watchlistArtists.length).toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="label">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="growthRate">Growth Rate</option>
                  <option value="breakoutScore">Breakout Score</option>
                  <option value="marketValue">Market Value</option>
                  <option value="priceChange">Price Change</option>
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
                  <option value="rising">Rising</option>
                  <option value="declining">Declining</option>
                  <option value="alerts">With Alerts</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredArtists.length} of {watchlistArtists.length} artists
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
                      <h3 className="text-xl font-bold text-gray-900">{artist.name}</h3>
                      <p className="text-gray-600">{artist.genre} • {artist.country}</p>
                      <p className="text-sm text-gray-500">Added {new Date(artist.dateAdded).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(artist.marketValue)}</div>
                        <div className={`text-sm flex items-center ${
                          artist.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {artist.priceChange >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {artist.priceChange >= 0 ? '+' : ''}{artist.priceChange}%
                        </div>
                      </div>
                      
                      <button className="btn btn-outline btn-sm">
                        Remove
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
                      <div className="text-sm text-gray-600">Breakout Score</div>
                      <div className="font-semibold">{artist.breakoutScore}/100</div>
                    </div>
                  </div>
                  
                  {artist.alerts.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">Recent Alerts</span>
                      </div>
                      <div className="space-y-1">
                        {artist.alerts.slice(0, 2).map((alert, index) => (
                          <div key={index} className="text-sm text-yellow-700">
                            • {alert.message} ({new Date(alert.date).toLocaleDateString()})
                          </div>
                        ))}
                      </div>
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