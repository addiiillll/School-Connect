import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get unique cities and states from the schools table
    const schools = await prisma.school.findMany({
      select: {
        city: true,
        state: true,
      },
    })

    // Extract unique cities and states
    const cities = [...new Set(schools.map(school => school.city))].sort()
    const states = [...new Set(schools.map(school => school.state))].sort()

    return NextResponse.json({
      cities,
      states,
    })
  } catch (error) {
    console.error('Error fetching filter options:', error)
    return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: 500 })
  }
}
