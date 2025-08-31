'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useDebounce } from '@/hooks/use-debounce'

interface School {
  id: number
  name: string
  city: string
  state: string
  image: string
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setPage(1)
      setHasMore(true)
      searchSchools(debouncedQuery, 1, true)
    } else {
      setSchools([])
      setHasMore(true)
    }
  }, [debouncedQuery])

  const searchSchools = async (searchQuery: string, pageNum: number = 1, reset: boolean = false) => {
    if (reset) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}`)
      const data = await response.json()
      const newSchools = data.schools || []
      
      if (reset) {
        setSchools(newSchools)
      } else {
        setSchools(prev => [...prev, ...newSchools])
      }
      
      setHasMore(newSchools.length === 10)
    } catch (error) {
      console.error('Search error:', error)
      if (reset) setSchools([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loadingMore && query.length >= 2) {
      const nextPage = page + 1
      setPage(nextPage)
      searchSchools(query, nextPage, false)
    }
  }

  const handleClose = () => {
    setQuery('')
    setSchools([])
    setPage(1)
    setHasMore(true)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Search Modal */}
      <div className="relative z-10 flex items-start justify-center pt-20 px-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search schools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg outline-none text-black placeholder-gray-500"
            />
            <button
              onClick={handleClose}
              className="ml-3 p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div 
            ref={scrollRef}
            className="max-h-96 overflow-y-auto"
            onScroll={handleScroll}
          >
            {loading && (
              <div className="p-4 text-center text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                Searching...
              </div>
            )}
            
            {!loading && query.length >= 2 && schools.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No schools found for "{query}"
              </div>
            )}

            {schools.map((school) => (
              <Link
                key={school.id}
                href={`/showSchools?search=${encodeURIComponent(school.name)}`}
                onClick={handleClose}
                className="flex items-center p-4 hover:bg-gray-50 border-b last:border-b-0"
              >
                <div className="relative w-12 h-12 mr-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-500">
                    {school.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-500">{school.city}, {school.state}</p>
                </div>
              </Link>
            ))}
            
            {loadingMore && (
              <div className="p-4 text-center text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}