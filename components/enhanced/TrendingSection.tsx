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
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'

interface TrendingItem {
  id: string
  rank: number
  previousRank?: number
  artist: {
    name: string
    avatar: string
    verified: boolean
    location: string
  }
  track: {
    title: string
    duration: string
    genre: string
  }
  metrics: {
    streams: number
    growth: number
    velocity: number
    countries: number
  }
  platforms: string[]
  isPlaying?: boolean
}

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

  // Mock trending data
  const trendingData: TrendingItem[] = [
    {
      id: '1',
      rank: 1,
      previousRank: 3,
      artist: {
        name: 'Burna Boy',
        avatar: '/api/placeholder/40/40',
        verified: true,
        location: 'Lagos, Nigeria'
      },
      track: {
        title: 'City Boys',
        duration: '3:24',
        genre: 'Afrobeats'
      },
      metrics: {
        streams: 2400000,
        growth: 156,
        velocity: 89,
        countries: 45
      },
      platforms: ['Spotify', 'Apple Music', 'Boomplay', 'Audiomack']
    },
    {
      id: '2',
      rank: 2,
      previousRank: 1,
      artist: {
        name: 'Tems',
        avatar: '/api/placeholder/40/40',
        verified: true,
        location: 'Lagos, Nigeria'
      },
      track: {
        title: 'Me & U',
        duration: '2:58',
        genre: 'Afro-R&B'
      },
      metrics: {
        streams: 1800000,
        growth: 78,
        velocity: 92,
        countries: 38
      },
      platforms: ['Spotify', 'Apple Music', 'YouTube Music']
    },
    {
      id: '3',
      rank: 3,
      artist: {
        name: 'Rema',
        avatar: '/api/placeholder/40/40',
        verified: true,
        location: 'Benin City, Nigeria'
      },
      track: {
        title: 'Holiday',
        duration: '3:12',
        genre: 'Afrobeats'
      },
      metrics: {
        streams: 1600000,
        growth: 234,
        velocity: 95,
        countries: 52
      },
      platforms: ['Spotify', 'Apple Music', 'Boomplay']
    },
    {
      id: '4',
      rank: 4,
      previousRank: 8,
      artist: {
        name: 'Ayra Starr',
        avatar: '/api/placeholder/40/40',
        verified: true,
        location: 'Lagos, Nigeria'
      },
      track: {
        title: 'Rush',
        duration: '3:06',
        genre: 'Afrobeats'
      },
      metrics: {
        streams: 1400000,
        growth: 189,
        velocity: 87,
        countries: 41
      },
      platforms: ['Spotify', 'Apple Music', 'Audiomack']
    },
    {
      id: '5',
      rank: 5,
      previousRank: 4,
      artist: {
        name: 'Wizkid',
        avatar: '/api/placeholder/40/40',
        verified: true,
        location: 'Lagos, Nigeria'
      },
      track: {
        title: 'Money & Love',
        duration: '3:45',
        genre: 'Afrobeats'
      },
      metrics: {
        streams: 1200000,
        growth: 45,
        velocity: 76,
        countries: 48
      },
      platforms: ['Spotify', 'Apple Music', 'Boomplay', 'YouTube Music']
    }
  ]

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

  const getRankChange = (current: number, previous?: number) => {
    if (!previous) return null
    const change = previous - current
    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
      amount: Math.abs(change)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

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
          <div className="space-y-0">
            {trendingData.slice(0, limit).map((item, index) => {
              const rankChange = getRankChange(item.rank, item.previousRank)
              const isPlaying = playingId === item.id
              const isLiked = likedItems.has(item.id)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="flex items-center space-x-4 p-4 border-b border-white/10 last:border-b-0 group"
                >
                  {/* Rank */}
                  <div className="flex items-center space-x-3 w-16">
                    <div className="text-2xl font-bold text-white">
                      {item.rank}
                    </div>
                    {rankChange && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center ${
                          rankChange.direction === 'up' ? 'text-green-400' : 
                          rankChange.direction === 'down' ? 'text-red-400' : 'text-gray-400'
                        }`}
                      >
                        {rankChange.direction === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : rankChange.direction === 'down' ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : null}
                        <span className="text-xs ml-1">{rankChange.amount}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePlay(item.id)}
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
                    src={item.artist.avatar}
                    alt={item.artist.name}
                    fallback={item.artist.name.charAt(0)}
                    className="ring-2 ring-white/20"
                  />

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-white truncate">{item.track.title}</h3>
                      {item.artist.verified && (
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.track.genre}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="truncate">{item.artist.name}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{item.artist.location}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="hidden md:flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="text-white font-bold">{formatNumber(item.metrics.streams)}</div>
                      <div className="text-gray-400">streams</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold ${
                        item.metrics.growth > 100 ? 'text-green-400' : 
                        item.metrics.growth > 50 ? 'text-yellow-400' : 'text-gray-300'
                      }`}>
                        +{item.metrics.growth}%
                      </div>
                      <div className="text-gray-400">growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{item.metrics.countries}</div>
                      <div className="text-gray-400">countries</div>
                    </div>
                  </div>

                  {/* Velocity Indicator */}
                  <div className="hidden lg:flex items-center space-x-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.metrics.velocity}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        className={`h-2 rounded-full ${
                          item.metrics.velocity > 80 ? 'bg-gradient-to-r from-green-400 to-blue-400' :
                          item.metrics.velocity > 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                          'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-gray-400 w-8">
                      {item.metrics.velocity}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(item.id)}
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
            })}
          </div>
        </CardContent>
      </Card>

      {/* View More */}
      {trendingData.length > limit && (
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