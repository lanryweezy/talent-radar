'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Heart, Share2, TrendingUp, MapPin, Users, Music, Star, ExternalLink, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { cn, formatNumber } from '@/lib/utils'
import { Artist } from '@/lib/types'

interface ArtistCardProps {
  artist: Artist
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
    if (score >= 80) return 'bg-green-500/10 text-green-400'
    if (score >= 60) return 'bg-yellow-500/10 text-yellow-400'
    return 'bg-red-500/10 text-red-400'
  }

  const getTrendIcon = (direction: string) => {
    if (direction === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />
    return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group"
      >
        <Card variant="glass" className="p-4 cursor-pointer hover:bg-white/[0.05] transition-all duration-300 border-white/10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar
                src={artist.image_url || undefined}
                alt={artist.name}
                size="lg"
                fallback={artist.name[0]}
                className="group-hover:ring-2 group-hover:ring-indigo-500 transition-all duration-300"
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
                <h3 className="font-bold text-white truncate">{artist.name}</h3>
                {artist.popularity > 70 && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                {artist.trend_direction === 'up' && <Badge variant="gradient" size="sm">Trending</Badge>}
              </div>
              <p className="text-sm text-gray-400 truncate">{artist.genres[0]}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {formatNumber(artist.followers)}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  {getTrendIcon(artist.trend_direction)}
                  <span className="ml-1">{artist.trend_direction.toUpperCase()}</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className={cn('text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest', getBreakoutColor(artist.breakout_score))}>
                {Math.round(artist.breakout_score)}%
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
        <Card variant="glass" className="overflow-hidden relative border-white/10">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={artist.image_url || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800'}
              alt={artist.name}
              className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={artist.image_url || undefined}
                  alt={artist.name}
                  size="xl"
                  ring
                  fallback={artist.name[0]}
                />
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
                    {artist.popularity > 70 && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                  </div>
                  <p className="text-white/80 mb-1">{artist.genres.slice(0, 2).join(', ')}</p>
                  <div className="flex items-center text-white/60 text-sm">
                    <Globe className="w-4 h-4 mr-1 text-indigo-400" />
                    Global Market
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
                <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{artist.popularity}</div>
                <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">Popularity</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold text-white">
                  {getTrendIcon(artist.trend_direction)}
                  <span className="ml-1 text-green-400">{artist.trend_direction.toUpperCase()}</span>
                </div>
                <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">Trend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{Math.round(artist.breakout_score)}%</div>
                <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">Breakout</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {showPlayButton && (
                  <Button
                    variant="gradient"
                    onClick={handlePlay}
                    className="shadow-lg px-6"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2 ml-0.5" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                )}
                <Link href={`/artist/${artist.id}`}>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 px-6">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    A&R Intelligence
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                {artist.trend_direction === 'up' && <Badge variant="gradient">🔥 Viral Potential</Badge>}
                <Badge variant="outline" className="border-white/30 text-white uppercase tracking-widest text-[10px] font-black">
                  {artist.genres[0]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none"
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card variant="glass" className="overflow-hidden hover:bg-white/[0.05] transition-all duration-300 border-white/10 bg-black/40 backdrop-blur-2xl">
        {/* Artist Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={artist.image_url || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800'}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Play Button */}
          {showPlayButton && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
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
          <div className="absolute top-4 left-4 flex space-x-2 z-20">
            {artist.trend_direction === 'up' && <Badge variant="gradient" className="text-[10px] font-black uppercase tracking-widest">🔥 Trending</Badge>}
            {artist.popularity > 80 && <Badge variant="outline" className="bg-black/50 backdrop-blur-md text-yellow-400 border-yellow-500/50 text-[10px] font-black uppercase tracking-widest">Pro Pick</Badge>}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10"
              onClick={handleLike}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current text-red-500')} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link href={`/artist/${artist.id}`}>
                  <h3 className="font-black text-2xl text-white truncate hover:text-indigo-400 transition-colors">{artist.name}</h3>
                </Link>
                {artist.popularity > 70 && <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />}
              </div>
              <p className="text-gray-400 font-medium mb-3">{artist.genres[0] || 'Unknown Genre'}</p>
              <div className="flex items-center text-gray-500 text-sm font-bold">
                <Globe className="w-4 h-4 mr-2 text-indigo-500" />
                <span className="truncate">Global Market</span>
              </div>
            </div>
            
            <div className={cn('text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest', getBreakoutColor(artist.breakout_score))}>
              {Math.round(artist.breakout_score)}%
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-6 pt-6 border-t border-white/5">
            <div>
              <div className="flex items-center text-white font-bold text-lg">
                <Users className="w-4 h-4 mr-2 text-indigo-400" />
                {formatNumber(artist.followers)}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Reach</div>
            </div>
            <div>
              <div className="flex items-center text-white font-bold text-lg">
                <Music className="w-4 h-4 mr-2 text-purple-400" />
                {artist.popularity}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Popularity</div>
            </div>
          </div>

          {/* Growth Rate */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center space-x-2">
              {getTrendIcon(artist.trend_direction)}
              <span className={cn('font-black text-xs uppercase tracking-widest',
                artist.trend_direction === 'up' ? 'text-green-400' : 'text-gray-400'
              )}>
                {artist.trend_direction} trend
              </span>
            </div>
            
            <Link href={`/artist/${artist.id}`}>
              <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 px-0">
                View Intel <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}