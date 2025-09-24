'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play, ExternalLink, TrendingUp, Users, Music, Globe, Star, Heart, Share2, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
  collaborations: string[]
  socialMedia: {
    instagram: number
    tiktok: number
    twitter: number
  }
  bio: string
  topTracks: Array<{
    name: string
    plays: number
    duration: string
    releaseDate: string
  }>
  analytics: {
    weeklyGrowth: number
    monthlyGrowth: number
    yearlyGrowth: number
    peakPosition: number
    chartEntries: number
    playlistPlacements: number
  }
  predictions: {
    nextMonthGrowth: number
    breakoutProbability: number
    marketPotential: string[]
    recommendedActions: string[]
  }
}

export default function ArtistProfile() {
  const params = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock data - In production, fetch from API using params.id
    const mockArtist: Artist = {
      id: params.id as string,
      name: 'Amaarae',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      genre: 'Afrobeats',
      country: 'Ghana',
      followers: 1200000,
      monthlyListeners: 2800000,
      growthRate: 156.7,
      breakoutScore: 94.2,
      platforms: ['Spotify', 'Apple Music', 'Audiomack', 'Boomplay'],
      topTrack: 'Angels in Tibet',
      recentActivity: 'Featured on major playlist',
      collaborations: ['Moliy', 'Cruel Santino', 'Kali Uchis'],
      socialMedia: {
        instagram: 890000,
        tiktok: 1500000,
        twitter: 340000
      },
      bio: 'Amaarae is a Ghanaian-American singer, songwriter, producer, and engineer known for her genre-blending approach to music. She seamlessly fuses elements of Afrobeats, R&B, pop, and electronic music to create a unique sound that has captivated audiences worldwide.',
      topTracks: [
        { name: 'Angels in Tibet', plays: 45000000, duration: '3:24', releaseDate: '2023-01-15' },
        { name: 'Sad Girlz Luv Money', plays: 32000000, duration: '2:58', releaseDate: '2022-08-20' },
        { name: 'Fancy', plays: 28000000, duration: '3:12', releaseDate: '2023-03-10' },
        { name: 'Hellz Angel', plays: 19000000, duration: '3:45', releaseDate: '2022-11-05' },
        { name: 'Princess Going Digital', plays: 15000000, duration: '2:47', releaseDate: '2023-05-22' }
      ],
      analytics: {
        weeklyGrowth: 12.5,
        monthlyGrowth: 45.8,
        yearlyGrowth: 234.7,
        peakPosition: 3,
        chartEntries: 12,
        playlistPlacements: 89
      },
      predictions: {
        nextMonthGrowth: 23.4,
        breakoutProbability: 87.3,
        marketPotential: ['United States', 'United Kingdom', 'Canada', 'Australia'],
        recommendedActions: [
          'Secure major label partnership',
          'Plan international tour',
          'Target US radio stations',
          'Collaborate with mainstream artists'
        ]
      }
    }

    setTimeout(() => {
      setArtist(mockArtist)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Artist not found</h2>
          <p className="text-gray-600 mb-4">The artist you're looking for doesn't exist.</p>
          <Link href="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <button className="btn btn-outline btn-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button className="btn btn-outline btn-sm">
                <Heart className="w-4 h-4 mr-2" />
                Watchlist
              </button>
              <button className="btn btn-primary btn-sm">
                <Star className="w-4 h-4 mr-2" />
                Sign Artist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-start space-x-8">
            <div className="relative">
              <Image
                src={artist.image}
                alt={artist.name}
                width={200}
                height={200}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{artist.genre}</span>
                <span className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {artist.country}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <div className="text-2xl font-bold">{formatNumber(artist.followers)}</div>
                  <div className="text-white/80 text-sm">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatNumber(artist.monthlyListeners)}</div>
                  <div className="text-white/80 text-sm">Monthly Listeners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">+{artist.growthRate}%</div>
                  <div className="text-white/80 text-sm">Growth Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">{artist.breakoutScore}/100</div>
                  <div className="text-white/80 text-sm">Breakout Score</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Play className="w-4 h-4 mr-2 inline" />
                  Play Top Track
                </button>
                <button className="border border-white/30 px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2 inline" />
                  View on Spotify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'tracks', label: 'Top Tracks' },
              { id: 'predictions', label: 'AI Predictions' },
              { id: 'social', label: 'Social Media' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">About</h3>
                </div>
                <div className="card-body">
                  <p className="text-gray-600">{artist.bio}</p>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </div>
                <div className="card-body">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">{artist.recentActivity}</span>
                    <span className="text-sm text-gray-400">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Platforms</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-2">
                    {artist.platforms.map(platform => (
                      <div key={platform} className="flex items-center justify-between">
                        <span className="text-gray-600">{platform}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Collaborations</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-2">
                    {artist.collaborations.map(collab => (
                      <div key={collab} className="text-gray-600">{collab}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Growth Metrics</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly Growth</span>
                    <span className="font-semibold text-green-600">+{artist.analytics.weeklyGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Growth</span>
                    <span className="font-semibold text-green-600">+{artist.analytics.monthlyGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yearly Growth</span>
                    <span className="font-semibold text-green-600">+{artist.analytics.yearlyGrowth}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Chart Performance</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peak Position</span>
                    <span className="font-semibold">#{artist.analytics.peakPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chart Entries</span>
                    <span className="font-semibold">{artist.analytics.chartEntries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Playlist Placements</span>
                    <span className="font-semibold">{artist.analytics.playlistPlacements}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracks' && (
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Top Tracks</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {artist.topTracks.map((track, index) => (
                  <div key={track.name} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{track.name}</div>
                      <div className="text-sm text-gray-600">{formatNumber(track.plays)} plays • {track.duration}</div>
                    </div>
                    <div className="text-sm text-gray-500">{track.releaseDate}</div>
                    <button className="p-2 hover:bg-gray-200 rounded">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">AI Predictions</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Next Month Growth</span>
                      <span className="font-semibold text-green-600">+{artist.predictions.nextMonthGrowth}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Breakout Probability</span>
                      <span className="font-semibold text-blue-600">{artist.predictions.breakoutProbability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${artist.predictions.breakoutProbability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Market Potential</h3>
              </div>
              <div className="card-body">
                <div className="space-y-2">
                  {artist.predictions.marketPotential.map(market => (
                    <div key={market} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{market}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Recommended Actions</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artist.predictions.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-2"></div>
                  Instagram
                </h3>
              </div>
              <div className="card-body">
                <div className="text-2xl font-bold">{formatNumber(artist.socialMedia.instagram)}</div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <div className="w-6 h-6 bg-black rounded mr-2"></div>
                  TikTok
                </h3>
              </div>
              <div className="card-body">
                <div className="text-2xl font-bold">{formatNumber(artist.socialMedia.tiktok)}</div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
                  Twitter
                </h3>
              </div>
              <div className="card-body">
                <div className="text-2xl font-bold">{formatNumber(artist.socialMedia.twitter)}</div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}