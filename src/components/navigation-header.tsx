'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { SearchOverlay } from '@/components/search-overlay'

export function NavigationHeader() {
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false)

  const navItems = [
    { name: 'Find Schools', href: '/showSchools' },
    { name: 'Add School', href: '/addSchool' },
  ]

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
           <div className="text-2xl font-bold">
            <span className="text-white">School</span><span className="text-cyan-400">Connect</span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="text-white hover:text-purple-200 transition-colors duration-200 p-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </nav>

          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setSearchOverlayOpen(true)}
              className="text-white hover:text-purple-200 transition-colors duration-200 p-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <SearchOverlay 
        isOpen={searchOverlayOpen} 
        onClose={() => setSearchOverlayOpen(false)} 
      />
    </header>
  )
}
