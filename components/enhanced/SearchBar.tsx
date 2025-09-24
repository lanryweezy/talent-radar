'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Mic, 
  Filter, 
  X, 
  TrendingUp, 
  Music, 
  User, 
  MapPin,
  Clock,
  Sparkles,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

interface SearchResult {
  id: string
  type: 'artist' | 'song' | 'trend' | 'location'
  title: string
  subtitle: string
  image?: string
  trending?: boolean
  verified?: boolean
  location?: string
  growth?: number
}

interface SearchBarProps {
  onSearch?: (query: string, filters?: any) => void
  placeholder?: string
  showFilters?: boolean
  showVoiceSearch?: boolean
  className?: string
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search artists, songs, trends...", 
  showFilters = true,
  showVoiceSearch = true,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock search results
  const searchResults: SearchResult[] = [
    {
      id: '1',
      type: 'artist',
      title: 'Burna Boy',
      subtitle: '2.4M monthly listeners • Lagos, Nigeria',
      trending: true,
      verified: true,
      location: 'Nigeria',
      growth: 45
    },
    {
      id: '2',
      type: 'artist',
      title: 'Tems',
      subtitle: '1.8M monthly listeners • Lagos, Nigeria',
      trending: true,
      verified: true,
      location: 'Nigeria',
      growth: 78
    },
    {
      id: '3',
      type: 'song',
      title: 'Last Last',
      subtitle: 'Burna Boy • 45M streams',
      trending: true,
      location: 'Global',
      growth: 23
    },
    {
      id: '4',
      type: 'trend',
      title: 'Afrobeats Rising',
      subtitle: 'Genre trending in 23 countries',
      trending: true,
      location: 'Global',
      growth: 156
    }
  ]

  const trendingSearches = [
    'Afrobeats Nigeria',
    'K-Pop Seoul',
    'UK Drill London',
    'Latin Trap Miami',
    'Amapiano South Africa'
  ]

  const filterOptions = [
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'songs', label: 'Songs', icon: Music },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'verified', label: 'Verified', icon: Sparkles },
    { id: 'global', label: 'Global', icon: Globe },
  ]

  const handleSearch = (searchQuery: string) => {
    if (onSearch) {
      onSearch(searchQuery, selectedFilters)
    }
    setShowResults(searchQuery.length > 0)
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulate voice search
    setTimeout(() => {
      setIsListening(false)
      setQuery('Burna Boy')
      handleSearch('Burna Boy')
    }, 2000)
  }

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'artist': return User
      case 'song': return Music
      case 'trend': return TrendingUp
      case 'location': return MapPin
      default: return Search
    }
  }

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Input */}
      <motion.div
        animate={{ 
          scale: isExpanded ? 1.02 : 1,
          boxShadow: isExpanded 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
        className="relative"
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 z-10">
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
              />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            onFocus={() => {
              setIsExpanded(true)
              setShowResults(query.length > 0)
            }}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
          />

          <div className="absolute right-2 flex items-center space-x-2">
            {showVoiceSearch && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoiceSearch}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            )}

            {showFilters && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  selectedFilters.length > 0 || showFiltersPanel
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Filter className="w-4 h-4" />
                {selectedFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {selectedFilters.length}
                  </span>
                )}
              </motion.button>
            )}

            {query && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuery('')
                  setShowResults(false)
                  handleSearch('')
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {selectedFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-2 mt-3 px-4"
            >
              <span className="text-sm text-gray-400">Filters:</span>
              {selectedFilters.map(filterId => {
                const filter = filterOptions.find(f => f.id === filterId)
                return filter ? (
                  <Badge
                    key={filterId}
                    variant="gradient"
                    className="text-xs cursor-pointer"
                    onClick={() => toggleFilter(filterId)}
                  >
                    {filter.label}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ) : null
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-white"
              >
                Clear all
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-0">
                {query ? (
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result) => {
                      const Icon = getResultIcon(result.type)
                      return (
                        <motion.div
                          key={result.id}
                          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                          className="flex items-center space-x-4 p-4 cursor-pointer border-b border-white/10 last:border-b-0"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-yellow-400" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{result.title}</span>
                              {result.verified && (
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                              )}
                              {result.trending && (
                                <Badge variant="gradient" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-400 flex items-center space-x-2">
                              <span>{result.subtitle}</span>
                              {result.location && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{result.location}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {result.growth && (
                            <div className="text-right">
                              <div className="text-green-400 font-bold text-sm">
                                +{result.growth}%
                              </div>
                              <div className="text-xs text-gray-400">growth</div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-6">
                    <h3 className="text-white font-medium mb-4">Trending Searches</h3>
                    <div className="space-y-2">
                      {trendingSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 4 }}
                          onClick={() => {
                            setQuery(search)
                            handleSearch(search)
                          }}
                          className="flex items-center space-x-3 w-full p-2 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                          <TrendingUp className="w-4 h-4 text-yellow-400" />
                          <span>{search}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFiltersPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-40"
          >
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Search Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFiltersPanel(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filterOptions.map(filter => {
                    const Icon = filter.icon
                    const isSelected = selectedFilters.includes(filter.id)
                    
                    return (
                      <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleFilter(filter.id)}
                        className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/50 text-yellow-400'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{filter.label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {selectedFilters.length > 0 && (
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-400">
                      {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} active
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-400 hover:text-white"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}