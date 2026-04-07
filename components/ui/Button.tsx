'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'glow' | 'premium'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-tight'
    
    const variants = {
      default: 'bg-white text-slate-950 hover:bg-slate-100 shadow-lg shadow-white/10',
      destructive: 'bg-rose-500 text-white hover:bg-rose-600',
      outline: 'border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-white/5',
      ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
      link: 'text-orange-400 underline-offset-4 hover:underline',
      gradient: 'bg-gradient-to-br from-orange-500 to-amber-500 text-white hover:shadow-orange-500/30 shadow-lg',
      glow: 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]',
      premium: 'bg-slate-950 text-white border border-white/10 hover:border-orange-500/50 hover:bg-slate-900 shadow-xl'
    }
    
    const sizes = {
      default: 'h-11 px-5 text-sm',
      sm: 'h-9 px-4 text-xs',
      lg: 'h-14 px-10 text-base',
      icon: 'h-11 w-11'
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        {...(props as any)}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }