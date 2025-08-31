'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface FilterOptions {
  cities: string[]
  states: string[]
}

interface ActiveFilters {
  city?: string
  state?: string
}

interface SchoolFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void
  activeFilters: ActiveFilters
}

export function SchoolFilters({ onFiltersChange, activeFilters }: SchoolFiltersProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cities: [], states: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFilterOptions()
  }, [])

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/schools/filters')
      if (response.ok) {
        const data = await response.json()
        setFilterOptions(data)
      }
    } catch (error) {
      console.error('Error fetching filter options:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    const newFilters = { ...activeFilters }
    if (value === 'all') {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    onFiltersChange(newFilters)
  }

  const clearFilter = (key: keyof ActiveFilters) => {
    const newFilters = { ...activeFilters }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.keys(activeFilters).length > 0

  if (loading) {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-4">
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>

            {/* City Filter */}
            <Select
              value={activeFilters.city || 'all'}
              onValueChange={(value) => handleFilterChange('city', value)}
            >
              <SelectTrigger className="w-[180px] bg-green-50 border-green-200 hover:bg-green-100">
                <SelectValue placeholder="Choose City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {filterOptions.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* State Filter */}
            <Select
              value={activeFilters.state || 'all'}
              onValueChange={(value) => handleFilterChange('state', value)}
            >
              <SelectTrigger className="w-[180px] bg-green-50 border-green-200 hover:bg-green-100">
                <SelectValue placeholder="Choose State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {filterOptions.states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {activeFilters.city && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  City: {activeFilters.city}
                  <button
                    onClick={() => clearFilter('city')}
                    className="ml-2 hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.state && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  State: {activeFilters.state}
                  <button
                    onClick={() => clearFilter('state')}
                    className="ml-2 hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
