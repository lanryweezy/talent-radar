'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Volume2, Maximize, Globe, TrendingUp, Users, Music, Star, ArrowRight, CheckCircle } from 'lucide-react'

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes demo
  const [currentSection, setCurrentSection] = useState(0)

  const demoSections = [
    {
      title: "Global Artist Discovery",
      description: "See how TalentRadar discovers emerging talent from every corner of the world",
      timestamp: 0,
      features: ["AI-powered search", "Multi-platform tracking", "Cultural context analysis"]
    },
    {
      title: "Breakout Predictions",
      description: "Watch our AI predict which artists will break out with 94% accuracy",
      timestamp: 45,
      features: ["Machine learning models", "Growth trajectory analysis", "Market potential scoring"]
    },
    {
      title: "Global Network",
      description: "Connect with A&R professionals worldwide and share discoveries",
      timestamp: 90,
      features: ["Professional networking", "Collaboration tools", "Market insights sharing"]
    },
    {
      title: "Real-Time Analytics",
      description: "Monitor artist performance and market trends in real-time",
      timestamp: 135,
      features: ["Live data feeds", "Custom dashboards", "Alert systems"]
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          
          // Update current section based on timestamp
          const newSection = demoSections.findIndex((section, index) => {
            const nextSection = demoSections[index + 1]
            return newTime >= section.timestamp && (!nextSection || newTime < nextSection.timestamp)
          })
          
          if (newSection !== -1 && newSection !== currentSection) {
            setCurrentSection(newSection)
          }
          
          if (newTime >= duration) {
            setIsPlaying(false)
            return duration
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSection, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (timestamp: number) => {
    setCurrentTime(timestamp)
    const sectionIndex = demoSections.findIndex((section, index) => {
      const nextSection = demoSections[index + 1]
      return timestamp >= section.timestamp && (!nextSection || timestamp < nextSection.timestamp)
    })
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Play className="w-4 h-4 mr-2" />
            EXCLUSIVE DEMO • GLOBAL A&R PLATFORM
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            See TalentRadar in Action
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how A&R professionals worldwide are discovering the next generation of superstars 
            with AI-powered insights and global market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Area */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                
                {/* Demo Content Based on Current Section */}
                <div className="relative z-10 text-center text-white p-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {currentSection === 0 && <Globe className="w-10 h-10" />}
                    {currentSection === 1 && <TrendingUp className="w-10 h-10" />}
                    {currentSection === 2 && <Users className="w-10 h-10" />}
                    {currentSection === 3 && <Music className="w-10 h-10" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{demoSections[currentSection].title}</h3>
                  <p className="text-lg text-blue-100 mb-6">{demoSections[currentSection].description}</p>
                  
                  {/* Feature List */}
                  <div className="space-y-2">
                    {demoSections[currentSection].features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 group"
                >
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-900" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    )}
                  </div>
                </button>
              </div>

              {/* Controls */}
              <div className="bg-gray-900 p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 cursor-pointer">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-1" />
                      )}
                    </button>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <div className="w-20 bg-gray-700 rounded-full h-1">
                        <div className="bg-white w-3/4 h-1 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors">
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Demo Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">2.4M+</div>
                <div className="text-gray-300 text-sm">Artists Tracked</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-gray-300 text-sm">Prediction Accuracy</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-gray-300 text-sm">Countries</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-300 text-sm">Global Coverage</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Demo Sections</h3>
              <div className="space-y-3">
                {demoSections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => handleSeek(section.timestamp)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentSection === index
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{section.title}</div>
                        <div className={`text-sm ${currentSection === index ? 'text-black' : 'text-gray-300'}`}>
                          {formatTime(section.timestamp)}
                        </div>
                      </div>
                      {currentSection === index && (
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <div className="space-y-3">
                {[
                  { icon: Globe, title: "Global Coverage", desc: "150+ countries tracked" },
                  { icon: TrendingUp, title: "AI Predictions", desc: "94% accuracy rate" },
                  { icon: Users, title: "A&R Network", desc: "Connect worldwide" },
                  { icon: Music, title: "Real-Time Data", desc: "Live market insights" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{feature.title}</div>
                      <div className="text-sm text-gray-300">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-black mb-2">Ready to Get Started?</h3>
              <p className="text-black text-opacity-80 mb-4">
                Join thousands of A&R professionals discovering global talent
              </p>
              <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Join Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Impressed? Join the Global A&R Revolution
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get early access to TalentRadar and start discovering the world's next superstars today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200">
              Schedule Personal Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}