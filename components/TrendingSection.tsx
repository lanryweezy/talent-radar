'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Filter, Globe } from 'lucide-react'
import ArtistCard from './ArtistCard'

interface TrendingArtist {
  artist: any
  trend_score: number
  velocity: number
  current_rank: number
  previous_rank?: number
  rank_change: number
}

export default function TrendingSection() {
  const [trendingData, setTrendingData] = useState<TrendingArtist[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    fetchTrendingData()
  }, [selectedRegion, selectedGenre])

  const fetchTrendingData = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        region: selectedRegion,
        limit: '12'
      })
      
      if (selectedGenre) {
        params.append('genre', selectedGenre)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending?${params}`)
      
      if (response.ok) {
        const data = await response.json()
        setTrendingData(data.trending_artists || [])
      }
    } catch (error) {
      console.error('Failed to fetch trending data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const regions = [
    { value: 'global', label: 'Global' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'south_africa', label: 'South Africa' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'us', label: 'United States' }
  ]

  const genres = [
    { value: '', label: 'All Genres' },
    { value: 'afrobeats', label: 'Afrobeats' },
    { value: 'hip-hop', label: 'Hip Hop' },
    { value: 'pop', label: 'Pop' },
    { value: 'r&b', label: 'R&B' },
    { value: 'reggae', label: 'Reggae' },
    { value: 'gospel', label: 'Gospel' }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-6 h-6 text-success-600" />
              <h2 className="text-3xl font-bold text-gray-900">Trending Artists</h2>
            </div>
            <p className="text-gray-600">
              Discover artists with the highest breakout potential right now
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {genres.map((genre) => (
                  <option key={genre.value} value={genre.value}>
                    {genre.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="card-body">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trending Artists Grid */}
        {!isLoading && trendingData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingData.map((item, index) => (
              <div key={item.artist.id} className="relative">
                {/* Rank Badge */}
                <div className="absolute -top-2 -left-2 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    index < 3 
                      ? 'bg-gradient-to-r from-warning-500 to-warning-600' 
                      : 'bg-gray-500'
                  }`}>
                    {item.current_rank}
                  </div>
                </div>
                
                {/* Rank Change Indicator */}
                {item.rank_change !== 0 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.rank_change > 0 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-danger-100 text-danger-800'
                    }`}>
                      {item.rank_change > 0 ? '+' : ''}{item.rank_change}
                    </div>
                  </div>
                )}
                
                <ArtistCard 
                  artist={{
                    ...item.artist,
                    breakout_score: item.trend_score
                  }} 
                />
                
                {/* Trend Velocity */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-success-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {(item.velocity * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && trendingData.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trending artists found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new trending artists.
            </p>
          </div>
        )}

        {/* View More Button */}
        {!isLoading && trendingData.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-outline btn-lg">
              View All Trending Artists
            </button>
          </div>
        )}
      </div>
    </section>
  )
}