'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, Share2, TrendingUp, MapPin, Users, Music, Star, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { cn, formatNumber } from '@/lib/utils'

interface ArtistCardProps {
  artist: {
    id: string
    name: string
    image: string
    genre: string
    location: string
    followers: number
    monthlyListeners: number
    growthRate: number
    breakoutScore: number
    topTrack: string
    isVerified: boolean
    isRising: boolean
    socialMedia: {
      instagram?: number
      tiktok?: number
      twitter?: number
    }
  }
  variant?: 'default' | 'compact' | 'featured'
  showPlayButton?: boolean
  onPlay?: (artistId: string) => void
  onLike?: (artistId: string) => void
  onShare?: (artistId: string) => void
}

export default function ArtistCard({ 
  artist, 
  variant = 'default',
  showPlayButton = true,
  onPlay,
  onLike,
  onShare
}: ArtistCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    onPlay?.(artist.id)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(artist.id)
  }

  const handleShare = () => {
    onShare?.(artist.id)
  }

  const getBreakoutColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getGrowthIcon = (rate: number) => {
    if (rate > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group"
      >
        <Card variant="glass" className="p-4 cursor-pointer hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar
                src={artist.image}
                alt={artist.name}
                size="lg"
                className="group-hover:ring-2 group-hover:ring-primary-500 transition-all duration-300"
              />
              {showPlayButton && (
                <Button
                  size="sm"
                  variant="gradient"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={handlePlay}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </Button>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 truncate">{artist.name}</h3>
                {artist.isVerified && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                {artist.isRising && <Badge variant="gradient" size="sm">Rising</Badge>}
              </div>
              <p className="text-sm text-gray-600 truncate">{artist.genre}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {formatNumber(artist.followers)}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  {getGrowthIcon(artist.growthRate)}
                  <span className="ml-1">{artist.growthRate > 0 ? '+' : ''}{artist.growthRate}%</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className={cn('text-xs font-medium px-2 py-1 rounded-full', getBreakoutColor(artist.breakoutScore))}>
                {artist.breakoutScore}%
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        className="group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card variant="gradient" className="overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={artist.image}
                  alt={artist.name}
                  size="xl"
                  ring
                />
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
                    {artist.isVerified && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                  </div>
                  <p className="text-white/80 mb-1">{artist.genre}</p>
                  <div className="flex items-center text-white/60 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {artist.location}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleLike}
                >
                  <Heart className={cn('w-4 h-4', isLiked && 'fill-current text-red-500')} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(artist.followers)}</div>
                <div className="text-white/60 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(artist.monthlyListeners)}</div>
                <div className="text-white/60 text-sm">Monthly</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold text-white">
                  {getGrowthIcon(artist.growthRate)}
                  <span className="ml-1">{artist.growthRate > 0 ? '+' : ''}{artist.growthRate}%</span>
                </div>
                <div className="text-white/60 text-sm">Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{artist.breakoutScore}%</div>
                <div className="text-white/60 text-sm">Breakout</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {showPlayButton && (
                  <Button
                    variant="gradient"
                    onClick={handlePlay}
                    className="shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2 ml-0.5" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                )}
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                {artist.isRising && <Badge variant="gradient">🔥 Rising Star</Badge>}
                <Badge variant="outline" className="border-white/30 text-white">
                  {artist.genre}
                </Badge>
              </div>
            </div>

            {/* Top Track */}
            {artist.topTrack && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center text-white/80 text-sm">
                  <Music className="w-4 h-4 mr-2" />
                  <span>Top Track: </span>
                  <span className="font-medium ml-1">{artist.topTrack}</span>
                </div>
              </div>
            )}
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent pointer-events-none"
          />
        </Card>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card variant="glass" className="overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Artist Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button */}
          {showPlayButton && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Button
                size="lg"
                variant="gradient"
                className="rounded-full w-16 h-16 shadow-2xl"
                onClick={handlePlay}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
            </motion.div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {artist.isRising && <Badge variant="gradient" size="sm">🔥 Rising</Badge>}
            {artist.isVerified && <Badge variant="primary" size="sm">✓ Verified</Badge>}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
              onClick={handleLike}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current text-red-500')} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-lg text-gray-900 truncate">{artist.name}</h3>
                {artist.isVerified && <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />}
              </div>
              <p className="text-gray-600 text-sm mb-2">{artist.genre}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{artist.location}</span>
              </div>
            </div>
            
            <div className={cn('text-xs font-bold px-3 py-1 rounded-full', getBreakoutColor(artist.breakoutScore))}>
              {artist.breakoutScore}%
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center text-gray-900 font-semibold">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                {formatNumber(artist.followers)}
              </div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div>
              <div className="flex items-center text-gray-900 font-semibold">
                <Music className="w-4 h-4 mr-2 text-gray-500" />
                {formatNumber(artist.monthlyListeners)}
              </div>
              <div className="text-xs text-gray-500">Monthly Listeners</div>
            </div>
          </div>

          {/* Growth Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getGrowthIcon(artist.growthRate)}
              <span className={cn('font-medium text-sm', 
                artist.growthRate > 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {artist.growthRate > 0 ? '+' : ''}{artist.growthRate}% growth
              </span>
            </div>
            
            <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details
            </Button>
          </div>

          {/* Top Track */}
          {artist.topTrack && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-gray-600 text-sm">
                <Music className="w-4 h-4 mr-2" />
                <span>Top: </span>
                <span className="font-medium ml-1 truncate">{artist.topTrack}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}