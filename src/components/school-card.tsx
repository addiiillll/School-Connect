'use client'

import Image from 'next/image'
import { Plus, Star } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: string
}

interface SchoolCardProps {
  school: School
}

export function SchoolCard({ school }: SchoolCardProps) {
  const [imageError, setImageError] = useState(false)


  const handleImageError = () => {
    setImageError(true)
  }


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* School Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {!imageError ? (
          <Image
            src={school.image}
            alt={school.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">
                  {school.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-blue-600 font-medium">No Image</p>
            </div>
          </div>
        )}

      </div>

      {/* Card Content */}
      <div className="p-4">

        {/* School Location */}
        <div className="text-sm text-cyan-500 font-medium mb-1">
          {school.city}
        </div>

        {/* School Name */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
          {school.name}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-4">
          {school.address + ', ' + school.city + ', ' + school.state}
        </p>

        <div className='flex justify-center'>
          <Button
            size="sm"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white"
          >
            View School
          </Button>
        </div>
      </div>
    </div>
  )
}
