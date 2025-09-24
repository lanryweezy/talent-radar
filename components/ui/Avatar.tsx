'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  ring?: boolean
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt, 
    size = 'md', 
    fallback, 
    status,
    ring = false,
    ...props 
  }, ref) => {
    const sizes = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20'
    }

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    }

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5'
    }

    return (
      <div 
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gray-100 overflow-hidden',
          sizes[size],
          ring && 'ring-2 ring-white ring-offset-2',
          className
        )}
        ref={ref}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : fallback ? (
          <span className="text-sm font-medium text-gray-700 select-none">
            {fallback}
          </span>
        ) : (
          <User className="w-1/2 h-1/2 text-gray-400" />
        )}
        
        {status && (
          <div 
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white',
              statusColors[status],
              statusSizes[size]
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

export { Avatar }