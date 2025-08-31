'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SchoolSearch } from '@/components/school-search'
import { SchoolCard } from '@/components/school-card'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDebounce } from '@/hooks/use-debounce'
import { X, Filter } from 'lucide-react'
import Link from 'next/link'

type School = {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: string
}

interface ActiveFilters {
  city?: string
  state?: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

export default function ShowSchools() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 12
  })

  const fetchSchools = useCallback(async (search?: string, filters?: ActiveFilters, page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()

      if (search) {
        params.append('search', search)
      }

      if (filters?.city) {
        params.append('city', filters.city)
      }

      if (filters?.state) {
        params.append('state', filters.state)
      }

      params.append('page', page.toString())
      params.append('limit', '12')

      const response = await fetch(`/api/schools?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setSchools(data.schools)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching schools:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initialize from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    const urlCity = searchParams.get('city') || ''
    const urlState = searchParams.get('state') || ''
    
    setSearchQuery(urlSearch)
    setActiveFilters({
      ...(urlCity && { city: urlCity }),
      ...(urlState && { state: urlState })
    })
  }, [searchParams])

  // Fetch schools when search query, filters, or page changes
  useEffect(() => {
    fetchSchools(searchQuery, activeFilters, currentPage)
  }, [fetchSchools, searchQuery, activeFilters, currentPage])

  // Reset to page 1 when search or filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [searchQuery, activeFilters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = (filters: ActiveFilters) => {
    setActiveFilters(filters)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const clearAllFilters = () => {
    setSearchQuery('')
    setActiveFilters({})
    setCurrentPage(1)
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || Object.keys(activeFilters).length > 0

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0
    if (searchQuery) count++
    if (activeFilters.city) count++
    if (activeFilters.state) count++
    return count
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect School</h1>
          <p className="text-lg text-gray-600">Discover the best educational institutions for your child</p>
        </div>

        {/* Search Component */}
        <SchoolSearch
          key={`${searchQuery}-${JSON.stringify(activeFilters)}`}
          onSearch={handleSearch}
          onFiltersChange={handleFiltersChange}
          searchQuery={searchQuery}
          activeFilters={activeFilters}
        />

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-white shadow-sm border rounded-lg p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                </div>

                {searchQuery && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:bg-purple-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {activeFilters.city && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    City: {activeFilters.city}
                    <button
                      onClick={() => {
                        const newFilters = { ...activeFilters }
                        delete newFilters.city
                        handleFiltersChange(newFilters)
                      }}
                      className="ml-2 hover:bg-blue-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {activeFilters.state && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                    State: {activeFilters.state}
                    <button
                      onClick={() => {
                        const newFilters = { ...activeFilters }
                        delete newFilters.state
                        handleFiltersChange(newFilters)
                      }}
                      className="ml-2 hover:bg-green-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>

              <Button
                onClick={clearAllFilters}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All ({getActiveFilterCount()})
              </Button>
            </div>
          </div>
        )}

        {/* Results Counter */}
        {!loading && pagination.totalCount > 0 && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Found <span className="font-semibold text-purple-600">{pagination.totalCount}</span> school{pagination.totalCount !== 1 ? 's' : ''} matching your criteria
            </p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : schools.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Schools Found</h3>

              {searchQuery || Object.keys(activeFilters).length > 0 ? (
                <>
                  <p className="text-gray-600 mb-8 text-lg">
                    We couldn't find any schools matching your search criteria.
                    Try adjusting your filters or search terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={clearAllFilters}
                      variant="outline"
                      size="lg"
                      className="px-8 py-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Clear All Filters
                    </Button>
                    <Link href="/addSchool">
                      <Button
                        size="lg"
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Add New School
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-8 text-lg">
                    Be the first to contribute to our school directory!
                    Help other parents by adding schools in your area.
                  </p>
                  <Link href="/addSchool">
                    <Button
                      size="lg"
                      className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Add First School
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              onPageChange={handlePageChange}
              totalCount={pagination.totalCount}
              limit={pagination.limit}
            />
          </>
        )}
      </div>
    </div>
  )
}