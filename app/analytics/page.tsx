'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Users, Music, Globe, Zap, Calendar, Filter, Download } from 'lucide-react'

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
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('growth')

  useEffect(() => {
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Deep insights into music industry trends and artist performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="btn btn-outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Artists</p>
                  <p className="text-2xl font-bold">{formatNumber(data.overview.totalArtists)}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-600 ml-1">vs last month</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tracks</p>
                  <p className="text-2xl font-bold">{formatNumber(data.overview.totalTracks)}</p>
                </div>
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+8.3%</span>
                <span className="text-gray-600 ml-1">vs last month</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Streams</p>
                  <p className="text-2xl font-bold">{formatNumber(data.overview.totalStreams)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+23.7%</span>
                <span className="text-gray-600 ml-1">vs last month</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Growth Rate</p>
                  <p className="text-2xl font-bold">{data.overview.avgGrowthRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">+5.2%</span>
                <span className="text-gray-600 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Trends */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Growth Trends</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('growth')}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedMetric === 'growth' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Growth
                </button>
                <button
                  onClick={() => setSelectedMetric('streams')}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedMetric === 'streams' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Streams
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-end space-x-2">
                {data.trends.monthlyGrowth.map((value, index) => (
                  <div key={index} className="flex-1 bg-blue-100 rounded-t relative">
                    <div
                      className="bg-blue-600 rounded-t transition-all duration-500"
                      style={{ height: `${(value / Math.max(...data.trends.monthlyGrowth)) * 100}%` }}
                    ></div>
                    <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-600 text-center">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center text-sm text-gray-600">Monthly Growth Rate (%)</div>
            </div>
          </div>

          {/* Genre Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Genre Distribution</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {data.trends.genreDistribution.map((genre, index) => (
                  <div key={genre.genre} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600">{genre.genre}</div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index === 0 ? 'bg-blue-600' :
                            index === 1 ? 'bg-purple-600' :
                            index === 2 ? 'bg-green-600' :
                            index === 3 ? 'bg-yellow-600' :
                            index === 4 ? 'bg-red-600' : 'bg-gray-600'
                          }`}
                          style={{ width: `${genre.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-right">{genre.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers and Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Genres */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Top Genres</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {data.overview.topGenres.map((genre, index) => (
                  <div key={genre.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{genre.name}</div>
                        <div className="text-sm text-gray-600">{formatNumber(genre.count)} artists</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+{genre.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Countries */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Top Countries</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {data.overview.topCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-gray-600">{formatNumber(country.count)} artists</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">+{country.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                AI Predictions
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{data.predictions.nextMonthBreakouts}</div>
                  <div className="text-sm text-gray-600">Predicted breakouts next month</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Emerging Genres</div>
                  <div className="flex flex-wrap gap-2">
                    {data.predictions.emergingGenres.map(genre => (
                      <span key={genre} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Hot Markets</div>
                  <div className="flex flex-wrap gap-2">
                    {data.predictions.hotMarkets.map(market => (
                      <span key={market} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Top Performers</h3>
          </div>
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Artist</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Growth Rate</th>
                    <th className="text-left py-3 px-4">Breakout Score</th>
                    <th className="text-left py-3 px-4">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPerformers.map((performer, index) => (
                    <tr key={performer.name} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{performer.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {performer.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-medium">+{performer.growth}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{performer.score}/100</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${performer.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}