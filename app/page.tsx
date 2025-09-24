'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, TrendingUp, Users, Music, Globe, Star, ArrowRight, Play, BarChart3, Mail, CheckCircle, MapPin, Calendar, Video, Sparkles, Target, Rocket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import WaitlistModal from '@/components/WaitlistModal'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const globalStats = {
    global: { artists: '2.4M+', countries: '150+', languages: '50+', regions: 'Worldwide' },
    africa: { artists: '450K+', countries: '54', languages: '20+', regions: 'All African Markets' },
    asia: { artists: '680K+', countries: '48', languages: '15+', regions: 'APAC Region' },
    americas: { artists: '890K+', countries: '35', languages: '10+', regions: 'North & South America' },
    europe: { artists: '420K+', countries: '44', languages: '12+', regions: 'European Union+' }
  }

  const testimonials = [
    {
      name: 'Kemi Adeleke',
      role: 'A&R Director, Lagos',
      flag: '🇳🇬',
      quote: "TalentRadar helped us discover 3 breakout Afrobeats artists before they went viral. The AI predictions are incredibly accurate for the African market.",
      gradient: 'from-green-500 to-blue-500'
    },
    {
      name: 'Li Wei',
      role: 'Music Executive, Beijing',
      flag: '🇨🇳',
      quote: "Finally, a platform that understands Chinese music culture and can predict crossover potential. Game-changing for our international expansion.",
      gradient: 'from-red-500 to-yellow-500'
    },
    {
      name: 'James Morrison',
      role: 'Head of A&R, London',
      flag: '🇬🇧',
      quote: "The global perspective is unmatched. We're now signing talent from markets we never would have discovered otherwise. Brilliant platform.",
      gradient: 'from-blue-500 to-purple-500'
    }
  ]

  const currentStats = globalStats[selectedRegion as keyof typeof globalStats] || globalStats.global

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-10"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-10"
        />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Global Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              GLOBAL LAUNCH • CONNECTING A&R WORLDWIDE
              <Rocket className="w-4 h-4 ml-2" />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <span className="ml-6 text-6xl font-bold text-white">TalentRadar</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              The World's First
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Global A&R Network
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              🌍 Discover emerging talent from <strong>every continent</strong> • 
              🤖 AI-powered predictions with <strong>94% accuracy</strong> • 
              🚀 Connect with A&R professionals <strong>worldwide</strong> • 
              🎵 From Lagos to London, Seoul to São Paulo
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-md mx-auto mb-12"
            >
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="flex-1 text-lg py-4"
                    required
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={isLoading}
                    className="whitespace-nowrap shadow-xl"
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-500 text-white px-6 py-4 rounded-xl flex items-center justify-center shadow-xl"
                >
                  <CheckCircle className="w-6 h-6 mr-3" />
                  <span className="font-bold">Welcome to the future of A&R! Check your email.</span>
                </motion.div>
              )}
              <p className="text-gray-400 text-sm mt-3">
                🎁 Early access • 🎬 Exclusive demo • 🌟 Founding member benefits
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            >
              <Button
                variant="glow"
                size="lg"
                onClick={() => setShowWaitlistModal(true)}
                className="w-full sm:w-auto shadow-2xl"
              >
                <Video className="w-5 h-5 mr-2" />
                Watch Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
              </Link>
            </motion.div>

            {/* Global Stats Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Card variant="glass" className="max-w-4xl mx-auto">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Choose Your Region</h3>
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {[
                      { key: 'global', label: '🌍 Global', flag: '🌍' },
                      { key: 'africa', label: '🌍 Africa', flag: '🇳🇬' },
                      { key: 'asia', label: '🌏 Asia', flag: '🇨🇳' },
                      { key: 'americas', label: '🌎 Americas', flag: '🇺🇸' },
                      { key: 'europe', label: '🌍 Europe', flag: '🇬🇧' }
                    ].map(region => (
                      <motion.button
                        key={region.key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRegion(region.key)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                          selectedRegion === region.key
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                        }`}
                      >
                        {region.label}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.div
                    key={selectedRegion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                  >
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">{currentStats.artists}</div>
                      <div className="text-gray-300">Artists Tracked</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">{currentStats.countries}</div>
                      <div className="text-gray-300">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">{currentStats.languages}</div>
                      <div className="text-gray-300">Languages</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">24/7</div>
                      <div className="text-gray-300">Global Coverage</div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Features Section */}
      <div className="py-24 bg-black bg-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              🌍 Built for the Global Music Industry
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Afrobeats in Lagos to K-Pop in Seoul, Reggaeton in Medellín to Drill in London - 
              we track talent everywhere music is made
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: '🌍 Global Discovery Engine',
                description: 'Track emerging talent across 150+ countries. From Nigerian Afrobeats to Chinese Hip-Hop, discover the next global superstars before they break worldwide.',
                gradient: 'from-blue-500/20 to-purple-500/20',
                hoverGradient: 'from-blue-500/30 to-purple-500/30',
                iconGradient: 'from-blue-500 to-purple-500'
              },
              {
                icon: TrendingUp,
                title: '🤖 Multi-Language AI',
                description: 'Our AI understands 50+ languages and cultural contexts. Analyze lyrics in Yoruba, Mandarin, Spanish, Arabic, and more with native-level comprehension.',
                gradient: 'from-green-500/20 to-blue-500/20',
                hoverGradient: 'from-green-500/30 to-blue-500/30',
                iconGradient: 'from-green-500 to-blue-500'
              },
              {
                icon: MapPin,
                title: '🗺️ Regional Expertise',
                description: 'Deep knowledge of local markets, cultural trends, and regional platforms. From Boomplay in Africa to QQ Music in China.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                hoverGradient: 'from-purple-500/30 to-pink-500/30',
                iconGradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Users,
                title: '🤝 A&R Network',
                description: 'Connect with A&R professionals worldwide. Share discoveries, collaborate on signings, and build the future of global music together.',
                gradient: 'from-yellow-500/20 to-orange-500/20',
                hoverGradient: 'from-yellow-500/30 to-orange-500/30',
                iconGradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Star,
                title: '🔄 Real-Time Translation',
                description: 'Instant translation of artist bios, social media content, and market insights. Break down language barriers in the global music industry.',
                gradient: 'from-red-500/20 to-pink-500/20',
                hoverGradient: 'from-red-500/30 to-pink-500/30',
                iconGradient: 'from-red-500 to-pink-500'
              },
              {
                icon: BarChart3,
                title: '🎭 Cultural Intelligence',
                description: 'Understand cultural contexts, local trends, and regional preferences. Make informed decisions with deep cultural insights.',
                gradient: 'from-indigo-500/20 to-purple-500/20',
                hoverGradient: 'from-indigo-500/30 to-purple-500/30',
                iconGradient: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  variant="glass"
                  className={`bg-gradient-to-br ${feature.gradient} hover:${feature.hoverGradient} transition-all duration-300 border border-white/10 h-full`}
                >
                  <CardContent className="pt-8 pb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.iconGradient} rounded-lg flex items-center justify-center mb-6`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Testimonials */}
      <div className="py-24 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by A&R Professionals Worldwide
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="glass" className="text-center">
                  <CardContent className="pt-12 pb-12">
                    <div className={`w-16 h-16 bg-gradient-to-r ${testimonials[currentTestimonial].gradient} rounded-full flex items-center justify-center text-2xl mx-auto mb-6`}>
                      {testimonials[currentTestimonial].flag}
                    </div>
                    <blockquote className="text-xl text-gray-300 italic mb-6 max-w-2xl mx-auto">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <div className="font-bold text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Launch Timeline */}
      <div className="py-24 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            🚀 Global Launch Timeline
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Phase 1: Beta Launch',
                date: 'Q1 2024 • Invite-only access',
                features: ['✅ Core A&R features', '✅ 50+ countries coverage', '✅ AI predictions v1.0'],
                icon: Calendar,
                gradient: 'from-green-500 to-blue-500',
                ring: false
              },
              {
                phase: 'Phase 2: Global Launch',
                date: 'Q2 2024 • Public access',
                features: ['🚀 150+ countries', '🚀 Multi-language support', '🚀 A&R network features'],
                icon: Star,
                gradient: 'from-yellow-400 to-orange-500',
                ring: true
              },
              {
                phase: 'Phase 3: Enterprise',
                date: 'Q3 2024 • Major labels',
                features: ['🎯 Custom integrations', '🎯 Advanced analytics', '🎯 White-label solutions'],
                icon: Target,
                gradient: 'from-purple-500 to-pink-500',
                ring: false
              }
            ].map((timeline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  variant="glass"
                  className={`${timeline.ring ? 'ring-2 ring-yellow-400' : ''} transition-all duration-300`}
                >
                  <CardContent className="pt-8 pb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${timeline.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <timeline.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{timeline.phase}</h3>
                    <p className="text-gray-300 mb-4">{timeline.date}</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {timeline.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-black bg-opacity-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover the World's Next Superstars?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of A&R professionals who are already using TalentRadar to find global talent
            </p>
            
            {!isSubmitted && (
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 text-lg py-4"
                    required
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={isLoading}
                    className="whitespace-nowrap"
                  >
                    {isLoading ? 'Joining...' : 'Get Early Access'}
                  </Button>
                </form>
              </div>
            )}

            <p className="text-gray-400">
              🌍 Global launch • 🎁 Founding member benefits • 🚀 Shape the future of A&R
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">TalentRadar</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 TalentRadar • Built for the global music industry</p>
              <p className="text-sm mt-1">
                🇳🇬 Made with love in Nigeria • 🇨🇳 Powered by global innovation • 🌍 For the world
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />
    </div>
  )
}