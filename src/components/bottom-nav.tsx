'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Plus, Search } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      active: pathname === '/'
    },
    {
      name: 'Add School',
      href: '/addSchool',
      icon: Plus,
      active: pathname === '/addSchool'
    },
    {
      name: 'Show Schools',
      href: '/showSchools',
      icon: Search,
      active: pathname === '/showSchools'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 md:hidden">
      <div className="flex items-end justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isAddSchool = item.name === 'Add School'
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center transition-all duration-200 ${
                isAddSchool ? '-mt-4' : 'mt-0'
              }`}
            >
              <div className={`p-3 rounded-full transition-all duration-200 ${
                isAddSchool
                  ? 'bg-purple-600 shadow-lg transform hover:scale-110'
                  : item.active
                  ? 'bg-purple-100'
                  : 'hover:bg-gray-100'
              }`}>
                <Icon className={`h-6 w-6 ${
                  isAddSchool
                    ? 'text-white'
                    : item.active
                    ? 'text-purple-600'
                    : 'text-gray-500'
                }`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                item.active ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}