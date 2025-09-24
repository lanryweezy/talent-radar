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
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import Navigation from '@/components/enhanced/Navigation'
import SearchBar from '@/components/enhanced/SearchBar'
import TrendingSection from '@/components/enhanced/TrendingSection'
import ArtistCard from '@/components/enhanced/ArtistCard'

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [selectedRegion, setSelectedRegion] = useState('global')

  // Mock user data
  const mockUser = {
    name: 'Alex Johnson',
    email: 'alex@talentscout.com',
    avatar: '/api/placeholder/40/40',
    role: 'A&R Director'
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <Navigation user={mockUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🌍 Global A&R Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Discover emerging talent from around the world • Real-time insights • AI-powered predictions
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="gradient" className="text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Live Data
              </Badge>
              <Button variant="gradient">
                <Star className="w-4 h-4 mr-2" />
                Discover Talent
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
                  {[
                    {
                      artist: 'Ayra Starr',
                      prediction: 'Breakout Potential',
                      confidence: 94,
                      timeframe: '3 months',
                      avatar: '/api/placeholder/32/32'
                    },
                    {
                      artist: 'Omah Lay',
                      prediction: 'Global Crossover',
                      confidence: 87,
                      timeframe: '6 months',
                      avatar: '/api/placeholder/32/32'
                    },
                    {
                      artist: 'Fireboy DML',
                      prediction: 'Chart Success',
                      confidence: 91,
                      timeframe: '2 months',
                      avatar: '/api/placeholder/32/32'
                    }
                  ].map((prediction, index) => (
                    <motion.div
                      key={prediction.artist}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar 
                          src={prediction.avatar} 
                          alt={prediction.artist} 
                          fallback={prediction.artist.charAt(0)}
                          size="sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{prediction.artist}</h4>
                          <p className="text-sm text-gray-400">{prediction.prediction}</p>
                        </div>
                        <Badge variant="gradient" className="text-xs">
                          {prediction.confidence}%
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Expected in {prediction.timeframe}</span>
                      </div>
                    </motion.div>
                  ))}
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