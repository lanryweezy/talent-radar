'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, BarChart3, ArrowRightLeft, X, Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { compareArtists, searchArtists } from '@/lib/api'
import { Artist } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [comparisonData, setComparisonData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Artist[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const fetchComparison = async () => {
      if (selectedIds.length === 0) {
        setComparisonData([])
        return
      }
      setIsLoading(true)
      try {
        const data = await compareArtists(selectedIds)
        setComparisonData(data)
      } catch (error) {
        toast.error('Failed to load comparison')
      } finally {
        setIsLoading(false)
      }
    }
    fetchComparison()
  }, [selectedIds])

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([])
        return
      }
      setIsSearching(true)
      try {
        const results = await searchArtists(searchQuery, 5)
        setSearchResults(results)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSearching(false)
      }
    }
    const timer = setTimeout(performSearch, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const addArtist = (id: string) => {
    if (selectedIds.length >= 3) {
      toast.error('Max 3 artists for comparison')
      return
    }
    if (selectedIds.includes(id)) return
    setSelectedIds([...selectedIds, id])
    setSearchQuery('')
  }

  const removeArtist = (id: string) => {
    setSelectedIds(selectedIds.filter(aid => aid !== id))
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 bg-indigo-500/10 border-indigo-500/20 text-indigo-400">BENCHMARKING</Badge>
          <h1 className="text-5xl font-black mb-4">Artist <span className="text-indigo-400">Comparison.</span></h1>
          <p className="text-gray-400 text-xl max-w-2xl">Side-by-side performance benchmarking and growth velocity analysis.</p>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Add artist to compare..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {searchResults.map(artist => (
                    <button
                      key={artist.id}
                      onClick={() => addArtist(artist.id)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-white/5 text-left transition-colors"
                    >
                      <Avatar src={artist.image_url || undefined} size="sm" fallback={artist.name[0]} />
                      <span className="font-bold text-sm">{artist.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-3 flex gap-4">
            {comparisonData.map(item => (
              <div key={item.artist.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative group">
                <Avatar src={item.artist.image_url} size="md" />
                <div>
                  <div className="font-black">{item.artist.name}</div>
                  <div className="text-xs text-indigo-400 font-bold">{Math.round(item.artist.breakout_score)}% Breakout</div>
                </div>
                <button
                  onClick={() => removeArtist(item.artist.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {selectedIds.length < 3 && (
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-4 flex items-center justify-center min-w-[200px] text-gray-500">
                <Plus className="w-5 h-5 mr-2" />
                <span className="text-sm font-bold">Add Artist</span>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Grid */}
        {isLoading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Computing Cross-Artist Metrics...</p>
          </div>
        ) : comparisonData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reach Column */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-400" />
                Audience Reach
              </h3>
              <div className="space-y-12">
                {comparisonData.map(item => (
                  <div key={item.artist.id}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-black uppercase text-gray-500">{item.artist.name}</span>
                      <span className="text-xl font-black">{formatNumber(item.artist.followers)}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.artist.followers / Math.max(...comparisonData.map(d => d.artist.followers))) * 100}%` }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Growth Velocity Column */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Growth Velocity
              </h3>
              <div className="space-y-12">
                {comparisonData.map(item => (
                  <div key={item.artist.id}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-black uppercase text-gray-500">{item.artist.name}</span>
                      <span className="text-xl font-black text-green-400">+{Math.round(item.growth.follower_growth * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.growth.follower_growth / Math.max(...comparisonData.map(d => d.growth.follower_growth))) * 100}%` }}
                        className="h-full bg-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Breakout Potential Column */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                A&R Score
              </h3>
              <div className="space-y-12">
                {comparisonData.map(item => (
                  <div key={item.artist.id}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-black uppercase text-gray-500">{item.artist.name}</span>
                      <span className="text-xl font-black text-yellow-400">{Math.round(item.artist.breakout_score)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.artist.breakout_score}%` }}
                        className="h-full bg-yellow-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div className="py-24 text-center bg-white/[0.02] rounded-[40px] border border-dashed border-white/10">
            <ArrowRightLeft className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-gray-500">No artists selected for comparison</h3>
            <p className="text-gray-600 font-medium mt-2">Search and add up to 3 artists to begin deep benchmarking.</p>
          </div>
        )}
      </div>
    </div>
  )
}
