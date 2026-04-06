'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Users, Music, Globe, Zap, Calendar, Filter, Download, ArrowUpRight, Target, Rocket, Activity, MapPin, Eye, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import Navigation from '@/components/enhanced/Navigation'
import { getTrendingArtists, searchArtists, getMarketHeatmap } from '@/lib/api'

interface AnalyticsData {
  overview: {
    totalArtists: number
    totalTracks: number
    totalStreams: number
    avgGrowthRate: number
    topGenres: Array<{ name: string; count: number; growth: number }>
    topCountries: Array<{ name: string; count: number; growth: number }>
  }
  trends: {
    weeklyGrowth: number[]
    monthlyGrowth: number[]
    genreDistribution: Array<{ genre: string; percentage: number }>
    platformDistribution: Array<{ platform: string; percentage: number }>
  }
  predictions: {
    nextMonthBreakouts: number
    emergingGenres: string[]
    hotMarkets: string[]
    riskFactors: string[]
  }
  topPerformers: Array<{
    name: string
    growth: number
    score: number
    category: string
  }>
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [heatmap, setHeatmap] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('growth')

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const hdata = await getMarketHeatmap()
        setHeatmap(hdata)
      } catch (error) {
        console.error(error)
      }
    }
    fetchHeatmap()

    // Mock analytics data
    const mockData: AnalyticsData = {
      overview: {
        totalArtists: 2400000,
        totalTracks: 45200000,
        totalStreams: 892000000000,
        avgGrowthRate: 23.7,
        topGenres: [
          { name: 'Afrobeats', count: 450000, growth: 34.2 },
          { name: 'Hip Hop', count: 380000, growth: 12.8 },
          { name: 'Pop', count: 320000, growth: 8.9 },
          { name: 'R&B', count: 280000, growth: 18.5 },
          { name: 'Amapiano', count: 190000, growth: 67.3 }
        ],
        topCountries: [
          { name: 'Nigeria', count: 520000, growth: 28.4 },
          { name: 'United States', count: 480000, growth: 5.2 },
          { name: 'South Africa', count: 290000, growth: 45.7 },
          { name: 'Ghana', count: 180000, growth: 38.9 },
          { name: 'Kenya', count: 120000, growth: 52.1 }
        ]
      },
      trends: {
        weeklyGrowth: [12.3, 15.7, 18.2, 22.1, 19.8, 25.4, 23.7],
        monthlyGrowth: [8.2, 12.5, 18.9, 23.7, 28.1, 32.4, 29.8, 35.2, 31.6, 38.9, 42.3, 45.7],
        genreDistribution: [
          { genre: 'Afrobeats', percentage: 28.5 },
          { genre: 'Hip Hop', percentage: 22.3 },
          { genre: 'Pop', percentage: 18.7 },
          { genre: 'R&B', percentage: 15.2 },
          { genre: 'Amapiano', percentage: 8.9 },
          { genre: 'Others', percentage: 6.4 }
        ],
        platformDistribution: [
          { platform: 'Spotify', percentage: 35.2 },
          { platform: 'Apple Music', percentage: 28.7 },
          { platform: 'YouTube Music', percentage: 18.9 },
          { platform: 'Audiomack', percentage: 12.4 },
          { platform: 'Boomplay', percentage: 4.8 }
        ]
      },
      predictions: {
        nextMonthBreakouts: 47,
        emergingGenres: ['Afro-drill', 'Afro-house', 'Alte', 'Afro-fusion'],
        hotMarkets: ['Lagos', 'Accra', 'Johannesburg', 'Nairobi', 'London'],
        riskFactors: ['Market saturation in Pop', 'Declining Hip Hop growth', 'Platform algorithm changes']
      },
      topPerformers: [
        { name: 'Tems', growth: 234.5, score: 98.7, category: 'Breakout Artist' },
        { name: 'Burna Boy', growth: 45.2, score: 96.3, category: 'Established' },
        { name: 'Amaarae', growth: 156.7, score: 94.2, category: 'Rising Star' },
        { name: 'Focalistic', growth: 167.9, score: 89.3, category: 'Genre Leader' },
        { name: 'Ayra Starr', growth: 198.2, score: 91.8, category: 'Breakout Artist' }
      ]
    }

    setTimeout(() => {
      setData(mockData)
      setIsLoading(false)
    }, 1000)
  }, [timeRange])

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Aggregating Market Data...</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <Navigation user={{ name: 'Alex Johnson', role: 'A&R Director' }} />

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">Macro Intelligence</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Deep Dive.</span>
              </h1>
              <p className="text-gray-400 mt-4 text-xl font-medium max-w-xl">
                Global market trends, genre saturation reports, and breakout forecasting.
              </p>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="gradient" className="flex-1 md:flex-none py-6 px-8">
                <Download className="w-4 h-4 mr-2" />
                Export Intelligence
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Market Heatmap Row */}
        <div className="mb-12">
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black flex items-center">
                <Globe className="w-6 h-6 mr-3 text-indigo-400" />
                Regional Market Heat
              </h3>
              <Badge variant="outline" className="text-indigo-400 border-indigo-500/20">Live Intelligence</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {heatmap.map((region) => (
                <div key={region.id} className="relative group">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all cursor-help">
                    <div className="text-2xl mb-1">{region.heat > 0.9 ? '🔥' : region.heat > 0.8 ? '⚡' : '✨'}</div>
                    <div className="font-black text-white text-xs mb-1 truncate">{region.name}</div>
                    <div className="text-[10px] font-bold text-indigo-400">{Math.round(region.heat * 100)}%</div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-gray-900 border border-white/10 rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl">
                      <div className="text-[10px] font-black uppercase text-gray-500 mb-2">Trending Genres</div>
                      <div className="flex flex-wrap gap-1">
                        {region.trending_genres.map((g: string) => (
                          <Badge key={g} variant="outline" className="text-[8px] py-0 px-1 border-white/5">{g}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Artists', value: formatNumber(data.overview.totalArtists), icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
            { label: 'Total Tracks', value: formatNumber(data.overview.totalTracks), icon: Music, color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { label: 'Total Streams', value: formatNumber(data.overview.totalStreams), icon: BarChart3, color: 'text-green-400', bg: 'bg-green-400/10' },
            { label: 'Avg Growth', value: `${data.overview.avgGrowthRate}%`, icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Growth Trends */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black flex items-center">
                <Activity className="w-6 h-6 mr-3 text-indigo-400" />
                Growth Velocity
              </h3>
              <div className="flex bg-white/5 p-1 rounded-xl">
                <button onClick={() => setSelectedMetric('growth')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${selectedMetric === 'growth' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Velocity</button>
                <button onClick={() => setSelectedMetric('streams')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${selectedMetric === 'streams' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>Volume</button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-3">
              {data.trends.monthlyGrowth.map((value, index) => (
                <div key={index} className="flex-1 bg-white/5 rounded-2xl relative group">
                  <div
                    className="bg-gradient-to-t from-indigo-600 to-purple-600 rounded-2xl transition-all duration-700"
                    style={{ height: `${(value / Math.max(...data.trends.monthlyGrowth)) * 100}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white px-2 py-1 rounded text-[10px] font-black">
                    {value}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genre Distribution */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
            <h3 className="text-2xl font-black mb-10 flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-purple-400" />
              Market Composition
            </h3>
            <div className="space-y-6">
              {data.trends.genreDistribution.map((genre, index) => (
                <div key={genre.genre}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">{genre.genre}</span>
                    <span className="text-xs font-black text-indigo-400">{genre.percentage}%</span>
                  </div>
                  <div className="bg-white/5 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${
                        index === 0 ? 'from-indigo-600 to-indigo-400' :
                        index === 1 ? 'from-purple-600 to-purple-400' :
                        'from-gray-600 to-gray-400'
                      }`}
                      style={{ width: `${genre.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers and Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Top Genres */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-gray-500 text-sm">Top Genres</h3>
            <div className="space-y-6">
              {data.overview.topGenres.map((genre, index) => (
                <div key={genre.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 font-black">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white">{genre.name}</div>
                      <div className="text-xs text-gray-500">{formatNumber(genre.count)} nodes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-green-400">+{genre.growth}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-gray-500 text-sm">Active Markets</h3>
            <div className="space-y-6">
              {data.overview.topCountries.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 font-black">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white">{country.name}</div>
                      <div className="text-xs text-gray-500">{formatNumber(country.count)} creators</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-green-400">+{country.growth}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[40px] p-10">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-indigo-400 text-sm flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              AI Forecasting
            </h3>
            <div className="space-y-8">
              <div>
                <div className="text-4xl font-black text-white">{data.predictions.nextMonthBreakouts}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Predicted Breakouts (30d)</div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Emerging Genres</div>
                <div className="flex flex-wrap gap-2">
                  {data.predictions.emergingGenres.map(genre => (
                    <Badge key={genre} variant="outline" className="bg-white/5 border-white/10 text-indigo-400">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Priority Markets</div>
                <div className="flex flex-wrap gap-2">
                  {data.predictions.hotMarkets.map(market => (
                    <Badge key={market} variant="outline" className="bg-white/5 border-white/10 text-green-400">
                      {market}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden">
          <div className="p-10 border-b border-white/10">
            <h3 className="text-2xl font-black flex items-center">
              <Rocket className="w-6 h-6 mr-3 text-indigo-400" />
              High Velocity Creators
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left py-6 px-10 text-[10px] font-black uppercase tracking-widest text-gray-500">Artist</th>
                  <th className="text-left py-6 px-10 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
                  <th className="text-left py-6 px-10 text-[10px] font-black uppercase tracking-widest text-gray-500">Velocity</th>
                  <th className="text-left py-6 px-10 text-[10px] font-black uppercase tracking-widest text-gray-500">Score</th>
                  <th className="text-left py-6 px-10 text-[10px] font-black uppercase tracking-widest text-gray-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.topPerformers.map((performer, index) => (
                  <tr key={performer.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 px-10">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black">
                          {index + 1}
                        </div>
                        <span className="font-bold text-white text-lg">{performer.name}</span>
                      </div>
                    </td>
                    <td className="py-6 px-10">
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-indigo-400 uppercase tracking-widest text-[10px] font-black">
                        {performer.category}
                      </Badge>
                    </td>
                    <td className="py-6 px-10">
                      <span className="text-green-400 font-black">+{performer.growth}%</span>
                    </td>
                    <td className="py-6 px-10">
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-white">{performer.score}</span>
                        <div className="w-24 bg-white/5 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-2 rounded-full"
                            style={{ width: `${performer.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-10">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}