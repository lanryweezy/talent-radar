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
      default: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900',
      destructive: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-gray-900',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-900',
      ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-900',
      link: 'text-gray-900 underline-offset-4 hover:underline focus-visible:ring-gray-900',
      gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:ring-yellow-400',
      glow: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-2xl transform hover:scale-105 focus-visible:ring-yellow-400 animate-pulse'
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