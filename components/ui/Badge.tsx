'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', pulse = false, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200"
    
    const variants = {
      default: "bg-gray-100 text-gray-800",
      primary: "bg-primary-100 text-primary-800",
      secondary: "bg-secondary-100 text-secondary-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800",
      outline: "border border-gray-300 text-gray-700 bg-transparent",
      gradient: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
    }
    
    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    }

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          pulse && "animate-pulse",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }