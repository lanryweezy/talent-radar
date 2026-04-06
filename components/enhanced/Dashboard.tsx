'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Music, 
  Globe, 
  Search, 
  Bell, 
  Settings,
  Star,
  Zap,
  BarChart3,
  MapPin,
  Calendar,
  Play,
  Heart,
  Share2,
  Filter,
  ArrowUpRight,
  Sparkles,
  Target,
  Rocket,
  Eye,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import Navigation from '@/components/enhanced/Navigation'
import SearchBar from '@/components/enhanced/SearchBar'
import TrendingSection from '@/components/enhanced/TrendingSection'
import ArtistCard from '@/components/enhanced/ArtistCard'
import { getTrendingArtists } from '@/lib/api'
import { TrendingArtistItem } from '@/lib/types'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [aiPredictions, setAiPredictions] = useState<TrendingArtistItem[]>([])
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true)
  const [pulseIndex, setPulseIndex] = useState(0)

  const marketPulse = [
    "🔥 Afrobeats surging in London (+45% streams)",
    "🚀 New breakout detected in Lagos: Shallipopi",
    "📈 Amapiano trending in 15 new regions this week",
    "✨ AI Accuracy reached 96.4% on Latin market",
    "🎵 Hip-Hop remains dominant in US Gen-Z demographics"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % marketPulse.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Mock user data
  const mockUser = {
    name: 'Alex Johnson',
    email: 'alex@talentscout.com',
    avatar: undefined,
    role: 'A&R Director'
  }

  useEffect(() => {
    async function fetchPredictions() {
      setIsLoadingPredictions(true)
      try {
        // Using trending artists as a proxy for predictions for now
        const data = await getTrendingArtists('global', undefined, 3)
        setAiPredictions(data.trending_artists)
      } catch (error) {
        console.error('Failed to fetch predictions:', error)
      } finally {
        setIsLoadingPredictions(false)
      }
    }
    fetchPredictions()
  }, [])

  const stats = [
    {
      title: 'Artists Tracked',
      value: '2.4M+',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-purple-500',
      description: 'Global database'
    },
    {
      title: 'Predictions Made',
      value: '15.2K',
      change: '+34%',
      icon: Target,
      color: 'from-green-500 to-blue-500',
      description: '94% accuracy rate'
    },
    {
      title: 'Countries Covered',
      value: '150+',
      change: '+5',
      icon: Globe,
      color: 'from-yellow-500 to-orange-500',
      description: 'Real-time monitoring'
    },
    {
      title: 'Breakout Artists',
      value: '847',
      change: '+23%',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      description: 'This month'
    }
  ]

  const quickInsights = [
    {
      title: 'Trending Genre',
      value: 'Afrobeats',
      change: '+156%',
      icon: Music,
      description: 'Growing in 23 countries'
    },
    {
      title: 'Hot Market',
      value: 'Lagos',
      change: '+89%',
      icon: MapPin,
      description: 'Most active this week'
    },
    {
      title: 'Viral Potential',
      value: '12 Artists',
      change: 'High',
      icon: Eye,
      description: 'Ready to breakout'
    }
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <Navigation user={mockUser} />

      {/* Market Pulse Ticker */}
      <div className="bg-white/5 border-b border-white/10 backdrop-blur-md sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Market Pulse
            </span>
            <div className="overflow-hidden h-5 flex-1 relative">
              <motion.p
                key={pulseIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-xs font-medium text-gray-300 absolute inset-0"
              >
                {marketPulse[pulseIndex]}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-end sm:items-center justify-between space-y-6 sm:space-y-0"
          >
            <div className="w-full sm:w-auto">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-indigo-400 font-mono tracking-wider">PRO ACCESS</Badge>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">v2.0.4</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-[0.9]">
                Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Intelligence.</span>
              </h1>
              <p className="text-gray-400 text-xl font-medium max-w-xl">
                Unified dashboard for global discovery and AI-driven growth analytics.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
              <Button variant="secondary" className="px-6 py-6 text-sm font-bold border border-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Custom Filters
              </Button>
              <Button variant="gradient" className="px-8 py-6 text-sm font-bold">
                <Rocket className="w-4 h-4 mr-2" />
                Explore Markets
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-8">
          <SearchBar 
            placeholder="Search artists, songs, trends across 150+ countries..."
            showFilters={true}
            showVoiceSearch={true}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card variant="glass" className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-gray-500 text-xs">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickInsights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card variant="glass" className="bg-gradient-to-r from-white/5 to-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-bold text-lg">{insight.value}</span>
                          <Badge variant="gradient" className="text-xs">
                            {insight.change}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">{insight.title}</p>
                        <p className="text-gray-500 text-xs">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trending */}
          <div className="lg:col-span-2 space-y-8">
            <TrendingSection 
              title="🔥 Global Trending Now"
              timeframe="24h"
              region="global"
              limit={8}
              showFilters={true}
            />
          </div>

          {/* Right Column - Insights & Actions */}
          <div className="space-y-6">
            {/* AI Predictions */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                  🤖 AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingPredictions ? (
                    <div className="py-8 text-center text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      <span>Analyzing trends...</span>
                    </div>
                  ) : aiPredictions.length > 0 ? (
                    aiPredictions.map((prediction, index) => (
                      <motion.div
                        key={prediction.artist.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar
                            src={prediction.artist.image_url || undefined}
                            alt={prediction.artist.name}
                            fallback={prediction.artist.name.charAt(0)}
                            size="sm"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{prediction.artist.name}</h4>
                            <p className="text-sm text-gray-400">{prediction.artist.genres[0] || 'Unknown Genre'}</p>
                          </div>
                          <Badge variant="gradient" className="text-xs">
                            {Math.round(prediction.artist.breakout_score)}%
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Expected breakout soon</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-400">
                      <span>No predictions available</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    View All Predictions
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white">⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                    <Search className="w-4 h-4 mr-2" />
                    Advanced Search
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                    <Users className="w-4 h-4 mr-2" />
                    A&R Network
                  </Button>
                  <Button variant="gradient" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Discover New Talent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white">📈 Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      action: 'New breakout artist detected', 
                      artist: 'Joeboy', 
                      time: '2 hours ago',
                      type: 'discovery',
                      growth: '+234%'
                    },
                    { 
                      action: 'AI prediction updated', 
                      artist: 'Wizkid', 
                      time: '4 hours ago',
                      type: 'prediction',
                      confidence: '96%'
                    },
                    { 
                      action: 'Trending alert triggered', 
                      artist: 'Davido', 
                      time: '6 hours ago',
                      type: 'trending',
                      countries: '12'
                    }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'discovery' ? 'bg-green-400' :
                        activity.type === 'prediction' ? 'bg-purple-400' : 'bg-yellow-400'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300 text-sm">{activity.action}</span>
                          <span className="text-white font-semibold text-sm">{activity.artist}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-500 text-xs">{activity.time}</span>
                          {activity.growth && (
                            <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                              {activity.growth}
                            </Badge>
                          )}
                          {activity.confidence && (
                            <Badge variant="outline" className="text-xs text-purple-400 border-purple-400/30">
                              {activity.confidence}
                            </Badge>
                          )}
                          {activity.countries && (
                            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400/30">
                              {activity.countries} countries
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                    View All Activity
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
