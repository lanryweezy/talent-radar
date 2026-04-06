'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'glow'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 focus-visible:ring-indigo-600',
      destructive: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
      outline: 'border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 focus-visible:ring-white',
      secondary: 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/10 focus-visible:ring-white',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/5 focus-visible:ring-white',
      link: 'text-indigo-400 underline-offset-4 hover:underline focus-visible:ring-indigo-400',
      gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white hover:opacity-90 shadow-xl shadow-orange-500/20 transform hover:-translate-y-0.5 focus-visible:ring-orange-500',
      glow: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transform hover:-translate-y-0.5 focus-visible:ring-orange-500 transition-all duration-300'
    }
    
    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10'
    }

    const isDisabled = disabled || loading

    const MotionButton = motion.button

    return (
      <MotionButton
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: variant === 'gradient' || variant === 'glow' ? 1.05 : 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        {...(props as any)}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'

export { Button }