'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, ExternalLink, TrendingUp, Users, Music, Globe, Star, Heart, Share2, MoreHorizontal, Zap } from 'lucide-react'

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
  archetype?: string
  momentum?: number
}

interface ArtistCardProps {
  artist: Artist
  showActions?: boolean
  compact?: boolean
}

export default function ArtistCard({ artist, showActions = true, compact = false }: ArtistCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isWatching, setIsWatching] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
    if (score >= 60) return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  }

  if (compact) {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="glass-card rounded-xl p-3 border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10"
          />
          <div className="flex-1 min-w-0">
            <Link href={`/artist/${artist.id}`}>
              <h3 className="font-bold text-sm text-slate-100 truncate">
                {artist.name}
              </h3>
            </Link>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{artist.genre}</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-orange-400">{artist.breakoutScore}</div>
            <div className="text-[10px] text-emerald-400">+{artist.growthRate}%</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden group border border-white/5 hover:border-orange-500/20 transition-all duration-500"
    >
      {/* Header Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40"
          >
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </motion.button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            {artist.breakoutScore > 75 && (
              <div className="bg-orange-500 text-white p-1.5 rounded-lg shadow-lg">
                <Zap className="w-4 h-4 fill-current" />
              </div>
            )}
            {artist.archetype && (
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-tighter">
                {artist.archetype}
              </div>
            )}
          </div>
          <div className={`px-2.5 py-1 rounded-lg border backdrop-blur-md text-xs font-black ${getScoreColor(artist.breakoutScore)}`}>
            {artist.breakoutScore}
          </div>
        </div>

        {/* Favorite/Watch Actions */}
        {showActions && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border backdrop-blur-md ${
                isLiked ? 'bg-rose-500 border-rose-400 text-white' : 'bg-slate-900/40 border-white/10 text-white hover:bg-slate-900/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Artist Info */}
        <div className="mb-4">
          <Link href={`/artist/${artist.id}`}>
            <h3 className="text-xl font-black text-white hover:text-orange-400 transition-colors mb-1 truncate">
              {artist.name}
            </h3>
          </Link>
          <div className="flex items-center text-slate-400 text-xs font-medium">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 mr-2">{artist.genre}</span>
            <Globe className="w-3 h-3 mr-1" />
            <span>{artist.country}</span>
          </div>
        </div>

        {/* Stats Grid - Tighter Layout */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Reach</div>
            <div className="text-sm font-bold text-slate-200">{formatNumber(artist.monthlyListeners)}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Velocity</div>
            <div className="text-sm font-bold text-emerald-400">+{artist.growthRate}%</div>
          </div>
        </div>

        {/* Growth Bar - Professional refinement */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold mb-2">
            <span className="text-slate-500">Momentum Phase</span>
            <span className={artist.growthRate >= 50 ? 'text-orange-400' : 'text-slate-400'}>
              {artist.growthRate >= 100 ? 'Supernova' :
               artist.growthRate >= 50 ? 'Breakout' : 'Emerging'}
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, artist.growthRate)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                artist.growthRate >= 50 ? 'bg-gradient-to-r from-orange-500 to-amber-300' : 'bg-slate-600'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center gap-2 pt-4 border-t border-white/5">
            <Link href={`/artist/${artist.id}`} className="flex-1">
              <button className="w-full py-2.5 bg-slate-100 hover:bg-white text-slate-950 text-xs font-bold rounded-xl transition-all active:scale-95">
                Full Intelligence
              </button>
            </Link>
            <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl border border-white/5 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}