'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDebounce } from '@/hooks/use-debounce'

interface FilterOptions {
  cities: string[]
  states: string[]
}

interface ActiveFilters {
  city?: string
  state?: string
}

interface SchoolSearchProps {
  onSearch: (query: string) => void
  onFiltersChange: (filters: ActiveFilters) => void
  searchQuery: string
  activeFilters: ActiveFilters
}

export function SchoolSearch({ onSearch, onFiltersChange, searchQuery, activeFilters }: SchoolSearchProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ cities: [], states: [] })
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounce the input value
  const debouncedInputValue = useDebounce(inputValue, 500)

  // Fetch filter options
  useEffect(() => {
    fetchFilterOptions()
  }, [])

  // Sync input value with prop
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // Call onSearch when debounced input changes
  useEffect(() => {
    onSearch(debouncedInputValue)
  }, [debouncedInputValue, onSearch])

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



  return (
    <div className="bg-white shadow-sm border rounded-lg p-6 mb-8">
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search schools by name, city, or address..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-12 pr-12 py-4 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
          />
          {inputValue && (
            <Button
              onClick={() => setInputValue('')}
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">
          Start typing to search schools instantly
        </p>
      </div>

      {/* Filters */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Filter Results</h3>
        
        {loading ? (
          <div className="flex justify-center space-x-4">
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* City Filter */}
            <div className="w-full sm:w-auto">
              <Select
                value={activeFilters.city || 'all'}
                onValueChange={(value) => handleFilterChange('city', value)}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-300 hover:bg-gray-100">
                  <SelectValue placeholder="Select City" />
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
            </div>

            {/* State Filter */}
            <div className="w-full sm:w-auto">
              <Select
                value={activeFilters.state || 'all'}
                onValueChange={(value) => handleFilterChange('state', value)}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-300 hover:bg-gray-100">
                  <SelectValue placeholder="Select State" />
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
