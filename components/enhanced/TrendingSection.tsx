'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Music, 
  Play, 
  Pause, 
  Heart, 
  Share2, 
  MoreHorizontal,
  MapPin,
  Clock,
  Users,
  Zap,
  Globe,
  Star,
  ArrowUpRight,
  Filter,
  Calendar,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { getTrendingArtists } from '@/lib/api'
import { TrendingArtistItem } from '@/lib/types'
import { formatNumber } from '@/lib/utils'

interface TrendingSectionProps {
  title?: string
  timeframe?: '24h' | '7d' | '30d'
  region?: string
  limit?: number
  showFilters?: boolean
}

export default function TrendingSection({ 
  title = "🔥 Trending Now",
  timeframe = '24h',
  region = 'global',
  limit = 10,
  showFilters = true
}: TrendingSectionProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)
  const [selectedRegion, setSelectedRegion] = useState(region)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
  const [showAllRegions, setShowAllRegions] = useState(false)
  const [trendingData, setTrendingData] = useState<TrendingArtistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getTrendingArtists(selectedRegion, undefined, limit)
        setTrendingData(data.trending_artists)
      } catch (error) {
        console.error('Failed to fetch trending artists:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [selectedRegion, limit])

  const timeframeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ]

  const regionOptions = [
    { value: 'global', label: '🌍 Global', flag: '🌍' },
    { value: 'africa', label: '🌍 Africa', flag: '🇳🇬' },
    { value: 'north-america', label: '🌎 North America', flag: '🇺🇸' },
    { value: 'europe', label: '🌍 Europe', flag: '🇬🇧' },
    { value: 'asia', label: '🌏 Asia', flag: '🇨🇳' },
    { value: 'south-america', label: '🌎 South America', flag: '🇧🇷' }
  ]

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id)
  }

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">
            Real-time tracking across {regionOptions.find(r => r.value === selectedRegion)?.label || 'Global'} • 
            Updated every 15 minutes
          </p>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Filter */}
            <div className="flex bg-white/10 rounded-lg p-1">
              {timeframeOptions.map(option => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTimeframe(option.value as any)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTimeframe === option.value
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* Region Filter */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllRegions(!showAllRegions)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">
                  {regionOptions.find(r => r.value === selectedRegion)?.label || 'Global'}
                </span>
              </motion.button>

              <AnimatePresence>
                {showAllRegions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-gray-800/50 shadow-2xl overflow-hidden z-10"
                  >
                    {regionOptions.map(region => (
                      <motion.button
                        key={region.value}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        onClick={() => {
                          setSelectedRegion(region.value)
                          setShowAllRegions(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:text-white transition-all duration-200"
                      >
                        <span className="text-lg">{region.flag}</span>
                        <span>{region.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Trending List */}
      <Card variant="glass">
        <CardContent className="p-0">
          <div className="space-y-0 min-h-[400px] flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-yellow-400" />
                <p className="text-lg font-medium">Loading trending global talent...</p>
              </div>
            ) : trendingData.length > 0 ? (
              trendingData.map((item, index) => {
                const isPlaying = playingId === item.artist.id
                const isLiked = likedItems.has(item.artist.id)

                return (
                  <motion.div
                    key={item.artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="flex items-center space-x-4 p-4 border-b border-white/10 last:border-b-0 group"
                  >
                    {/* Rank */}
                    <div className="flex items-center space-x-3 w-16">
                      <div className="text-2xl font-bold text-white">
                        {item.current_rank}
                      </div>
                      {item.previous_rank && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`flex items-center ${
                            item.rank_change > 0 ? 'text-green-400' :
                            item.rank_change < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}
                        >
                          {item.rank_change > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : item.rank_change < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : null}
                          <span className="text-xs ml-1">{Math.abs(item.rank_change)}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Play Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePlay(item.artist.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isPlaying
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </motion.button>

                    {/* Artist Avatar */}
                    <Avatar
                      src={item.artist.image_url || undefined}
                      alt={item.artist.name}
                      fallback={item.artist.name.charAt(0)}
                      className="ring-2 ring-white/20"
                    />

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-white truncate">{item.artist.name}</h3>
                        {item.artist.popularity > 70 && (
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        )}
                        {item.artist.genres.slice(0, 1).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{formatNumber(item.artist.followers)} followers</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>Score: {Math.round(item.artist.breakout_score)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-white font-bold">{item.artist.popularity}</div>
                        <div className="text-gray-400">popularity</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${
                          item.trend_score > 80 ? 'text-green-400' :
                          item.trend_score > 60 ? 'text-yellow-400' : 'text-gray-300'
                        }`}>
                          {Math.round(item.trend_score)}%
                        </div>
                        <div className="text-gray-400">trend</div>
                      </div>
                    </div>

                    {/* Velocity Indicator */}
                    <div className="hidden lg:flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.velocity * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className={`h-2 rounded-full ${
                            item.velocity > 0.8 ? 'bg-gradient-to-r from-green-400 to-blue-400' :
                            item.velocity > 0.5 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}
                        />
                      </div>
                      <div className="text-xs text-gray-400 w-8">
                        {Math.round(item.velocity * 100)}%
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(item.artist.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isLiked
                            ? 'text-red-400 bg-red-400/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="flex-1 flex items-center justify-center p-12 text-gray-400">
                <p>No trending artists found for this region.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View More */}
      {trendingData.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            View All Trending
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
