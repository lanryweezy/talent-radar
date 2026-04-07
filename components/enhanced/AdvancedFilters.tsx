'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
}

interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
}

interface AdvancedFiltersProps {
  groups: FilterGroup[]
  selectedFilters: Record<string, string>
  onFilterChange: (groupId: string, value: string) => void
  onReset: () => void
  className?: string
}

export function AdvancedFilters({
  groups,
  selectedFilters,
  onFilterChange,
  onReset,
  className
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeFiltersCount = Object.values(selectedFilters).filter(v => v !== 'all' && v !== '').length

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="border-white/10 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest px-6"
        >
          <Filter className="w-3.5 h-3.5 mr-2" />
          {isOpen ? 'Hide Parameters' : 'Advanced Parameters'}
          {activeFiltersCount > 0 && (
             <Badge className="ml-2 bg-orange-500 text-white border-0 text-[9px] px-1.5 py-0">
               {activeFiltersCount}
             </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white">
            Clear All
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-3xl">
              {groups.map((group) => (
                <div key={group.id} className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-1">
                    {group.label}
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedFilters[group.id] || 'all'}
                      onChange={(e) => onFilterChange(group.id, e.target.value)}
                      className="w-full bg-white/5 border border-white/5 hover:border-orange-500/30 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
                    >
                      {group.options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-950">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
