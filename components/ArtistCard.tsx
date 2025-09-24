'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, ExternalLink, TrendingUp, Users, Music, Globe, Star, Heart, Share2, MoreHorizontal } from 'lucide-react'

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
  collaborations?: string[]
  socialMedia?: {
    instagram: number
    tiktok: number
    twitter: number
  }
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
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-blue-600 bg-blue-100'
    if (score >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getGrowthColor = (growth: number) => {
    if (growth >= 100) return 'text-green-600'
    if (growth >= 50) return 'text-blue-600'
    if (growth >= 20) return 'text-yellow-600'
    return 'text-gray-600'
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex items-center space-x-4">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <Link href={`/artist/${artist.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer truncate">
                {artist.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 truncate">{artist.genre} • {artist.country}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{artist.breakoutScore}/100</div>
            <div className={`text-xs ${getGrowthColor(artist.growthRate)}`}>
              +{artist.growthRate}%
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-gray-900 ml-1" />
          </button>
        </div>

        {/* Breakout Score Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(artist.breakoutScore)}`}>
            {artist.breakoutScore}/100
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="absolute top-3 left-3 flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWatching(!isWatching)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isWatching ? 'bg-yellow-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Star className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Artist Info */}
        <div className="mb-4">
          <Link href={`/artist/${artist.id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
              {artist.name}
            </h3>
          </Link>
          <div className="flex items-center text-gray-600 text-sm">
            <Music className="w-4 h-4 mr-1" />
            <span>{artist.genre}</span>
            <span className="mx-2">•</span>
            <Globe className="w-4 h-4 mr-1" />
            <span>{artist.country}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
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
            <div className={`font-semibold ${getGrowthColor(artist.growthRate)}`}>
              +{artist.growthRate}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Top Track</div>
            <div className="font-semibold text-sm truncate">{artist.topTrack}</div>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Growth Momentum</span>
            <span className={`font-semibold ${getGrowthColor(artist.growthRate)}`}>
              {artist.growthRate >= 100 ? 'Explosive' : 
               artist.growthRate >= 50 ? 'High' : 
               artist.growthRate >= 20 ? 'Moderate' : 'Steady'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                artist.growthRate >= 100 ? 'bg-green-500' :
                artist.growthRate >= 50 ? 'bg-blue-500' :
                artist.growthRate >= 20 ? 'bg-yellow-500' : 'bg-gray-500'
              }`}
              style={{ width: `${Math.min(100, artist.growthRate)}%` }}
            ></div>
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Available on</div>
          <div className="flex flex-wrap gap-1">
            {artist.platforms.slice(0, 3).map(platform => (
              <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {platform}
              </span>
            ))}
            {artist.platforms.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{artist.platforms.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-blue-800">{artist.recentActivity}</span>
          </div>
        </div>

        {/* Social Media Preview */}
        {artist.socialMedia && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Social Following</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold">{formatNumber(artist.socialMedia.instagram)}</div>
                <div className="text-gray-500">IG</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formatNumber(artist.socialMedia.tiktok)}</div>
                <div className="text-gray-500">TikTok</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{formatNumber(artist.socialMedia.twitter)}</div>
                <div className="text-gray-500">Twitter</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Link href={`/artist/${artist.id}`}>
                <button className="btn btn-primary btn-sm">
                  View Profile
                </button>
              </Link>
              <button className="btn btn-outline btn-sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Listen
              </button>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}