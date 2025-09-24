'use client'

import { useState, useEffect } from 'react'
import { Users, Music, TrendingUp, Globe, Zap, BarChart3 } from 'lucide-react'

interface Stat {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}

export default function StatsOverview() {
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats([
        {
          label: 'Artists Tracked',
          value: '2.4M+',
          change: '+12.5%',
          changeType: 'positive',
          icon: <Users className="w-6 h-6" />
        },
        {
          label: 'Tracks Analyzed',
          value: '45.2M+',
          change: '+8.3%',
          changeType: 'positive',
          icon: <Music className="w-6 h-6" />
        },
        {
          label: 'Breakout Predictions',
          value: '98.7%',
          change: '+2.1%',
          changeType: 'positive',
          icon: <Zap className="w-6 h-6" />
        },
        {
          label: 'Markets Covered',
          value: '54',
          change: '+6',
          changeType: 'positive',
          icon: <Globe className="w-6 h-6" />
        },
        {
          label: 'Growth Rate',
          value: '156%',
          change: '+23%',
          changeType: 'positive',
          icon: <TrendingUp className="w-6 h-6" />
        },
        {
          label: 'Success Rate',
          value: '94.2%',
          change: '+1.8%',
          changeType: 'positive',
          icon: <BarChart3 className="w-6 h-6" />
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg mb-3 group-hover:from-primary-200 group-hover:to-secondary-200 transition-colors">
                <div className="text-primary-600">
                  {stat.icon}
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>

              <div className="text-sm text-gray-600 mb-1">
                {stat.label}
              </div>

              <div className={`text-xs font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : stat.changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}>
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes millions of data points daily across streaming platforms, social media,
            and local markets to identify the next generation of music superstars.
          </p>
        </div>
      </div>
    </section>
  )
}