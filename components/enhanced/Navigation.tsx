'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe,
  TrendingUp,
  Users,
  BarChart3,
  Star,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'

interface NavigationProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role: string
  }
}

export default function Navigation({ user }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/discover', label: 'Discover', icon: Search },
    { href: '/trending', label: 'Trending', icon: TrendingUp },
    { href: '/network', label: 'Network', icon: Users },
    { href: '/insights', label: 'Insights', icon: Star },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                <Zap className="w-6 h-6 text-white fill-current" />
              </motion.div>
              <span className="text-2xl font-black text-white tracking-tighter transition-colors">
                TALENT<span className="text-indigo-400">RADAR</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center bg-white/[0.03] backdrop-blur-md border border-white/10 p-1 rounded-2xl">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-6 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm font-bold tracking-tight ${
                        isActive(item.href)
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 ${isActive(item.href) ? 'text-indigo-400' : ''}`} />
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Global Indicator */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-2 rounded-lg border border-blue-500/30"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">150+ Countries</span>
              </motion.div>

              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs text-white font-bold">{notifications}</span>
                  </motion.div>
                )}
              </motion.button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      fallback={user.name.charAt(0)}
                      size="sm"
                    />
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.role}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-gray-800/50 shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-800/50">
                          <div className="flex items-center space-x-3">
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              fallback={user.name.charAt(0)}
                            />
                            <div>
                              <div className="font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          {[
                            { icon: User, label: 'Profile', href: '/profile' },
                            { icon: Settings, label: 'Settings', href: '/settings' },
                            { icon: BarChart3, label: 'Analytics', href: '/analytics' },
                          ].map((item) => {
                            const Icon = item.icon
                            return (
                              <Link key={item.href} href={item.href}>
                                <motion.div
                                  whileHover={{ x: 4 }}
                                  className="flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                >
                                  <Icon className="w-4 h-4" />
                                  <span>{item.label}</span>
                                </motion.div>
                              </Link>
                            )
                          })}
                          
                          <div className="border-t border-gray-800/50 mt-2 pt-2">
                            <motion.button
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 w-full"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="gradient" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  )
                })}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-800/50 space-y-2">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="gradient" className="w-full justify-start">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  )
}