import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 10
    const skip = (page - 1) * limit

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ schools: [] })
    }

    const schools = await prisma.school.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { city: { contains: query } },
          { state: { contains: query } }
        ]
      },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        image: true
      },
      skip,
      take: limit
    })

    return NextResponse.json({ schools })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}