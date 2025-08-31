import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const schools = [
  {
    name: "Greenwood Elementary School",
    address: "123 Oak Street",
    city: "Springfield",
    state: "Illinois",
    contact: "217-555-0101",
    email_id: "info@greenwood.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Lincoln High School",
    address: "456 Maple Avenue",
    city: "Chicago",
    state: "Illinois",
    contact: "312-555-0102",
    email_id: "admin@lincoln.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Riverside Middle School",
    address: "789 River Road",
    city: "Peoria",
    state: "Illinois",
    contact: "309-555-0103",
    email_id: "contact@riverside.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Sunset Academy",
    address: "321 Sunset Boulevard",
    city: "Los Angeles",
    state: "California",
    contact: "213-555-0104",
    email_id: "info@sunset.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Mountain View Elementary",
    address: "654 Hill Drive",
    city: "Denver",
    state: "Colorado",
    contact: "303-555-0105",
    email_id: "admin@mountainview.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Oceanside High School",
    address: "987 Beach Road",
    city: "Miami",
    state: "Florida",
    contact: "305-555-0106",
    email_id: "info@oceanside.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Pine Valley School",
    address: "147 Pine Street",
    city: "Atlanta",
    state: "Georgia",
    contact: "404-555-0107",
    email_id: "contact@pinevalley.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Central Park Academy",
    address: "258 Park Avenue",
    city: "New York",
    state: "New York",
    contact: "212-555-0108",
    email_id: "admin@centralpark.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Lakeside Elementary",
    address: "369 Lake Shore Drive",
    city: "Detroit",
    state: "Michigan",
    contact: "313-555-0109",
    email_id: "info@lakeside.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Desert Springs High",
    address: "741 Desert Road",
    city: "Phoenix",
    state: "Arizona",
    contact: "602-555-0110",
    email_id: "contact@desertsprings.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Maple Grove School",
    address: "852 Grove Street",
    city: "Minneapolis",
    state: "Minnesota",
    contact: "612-555-0111",
    email_id: "admin@maplegrove.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Hillcrest Academy",
    address: "963 Hill Avenue",
    city: "Seattle",
    state: "Washington",
    contact: "206-555-0112",
    email_id: "info@hillcrest.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Valley View Elementary",
    address: "159 Valley Road",
    city: "Portland",
    state: "Oregon",
    contact: "503-555-0113",
    email_id: "contact@valleyview.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Brookstone High School",
    address: "357 Brook Lane",
    city: "Boston",
    state: "Massachusetts",
    contact: "617-555-0114",
    email_id: "admin@brookstone.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Fairfield Middle School",
    address: "468 Fair Street",
    city: "Hartford",
    state: "Connecticut",
    contact: "860-555-0115",
    email_id: "info@fairfield.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Redwood Elementary",
    address: "579 Redwood Drive",
    city: "Sacramento",
    state: "California",
    contact: "916-555-0116",
    email_id: "contact@redwood.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Northside Academy",
    address: "680 North Street",
    city: "Dallas",
    state: "Texas",
    contact: "214-555-0117",
    email_id: "admin@northside.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Eastwood High School",
    address: "791 East Avenue",
    city: "Houston",
    state: "Texas",
    contact: "713-555-0118",
    email_id: "info@eastwood.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Westfield Elementary",
    address: "802 West Road",
    city: "San Antonio",
    state: "Texas",
    contact: "210-555-0119",
    email_id: "contact@westfield.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Southgate Middle School",
    address: "913 South Boulevard",
    city: "Austin",
    state: "Texas",
    contact: "512-555-0120",
    email_id: "admin@southgate.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Clearwater Academy",
    address: "124 Clear Street",
    city: "Tampa",
    state: "Florida",
    contact: "813-555-0121",
    email_id: "info@clearwater.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Golden Gate Elementary",
    address: "235 Golden Avenue",
    city: "San Francisco",
    state: "California",
    contact: "415-555-0122",
    email_id: "contact@goldengate.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Liberty High School",
    address: "346 Liberty Street",
    city: "Philadelphia",
    state: "Pennsylvania",
    contact: "215-555-0123",
    email_id: "admin@liberty.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Heritage Middle School",
    address: "457 Heritage Road",
    city: "Nashville",
    state: "Tennessee",
    contact: "615-555-0124",
    email_id: "info@heritage.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Cornerstone Academy",
    address: "568 Corner Lane",
    city: "Charlotte",
    state: "North Carolina",
    contact: "704-555-0125",
    email_id: "contact@cornerstone.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Bridgewater Elementary",
    address: "679 Bridge Street",
    city: "Richmond",
    state: "Virginia",
    contact: "804-555-0126",
    email_id: "admin@bridgewater.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Meadowbrook High School",
    address: "780 Meadow Drive",
    city: "Columbus",
    state: "Ohio",
    contact: "614-555-0127",
    email_id: "info@meadowbrook.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Stonegate Middle School",
    address: "891 Stone Avenue",
    city: "Indianapolis",
    state: "Indiana",
    contact: "317-555-0128",
    email_id: "contact@stonegate.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Willowbrook Academy",
    address: "902 Willow Road",
    city: "Milwaukee",
    state: "Wisconsin",
    contact: "414-555-0129",
    email_id: "admin@willowbrook.edu",
    image: "/placeholder.svg"
  },
  {
    name: "Crestview Elementary",
    address: "013 Crest Boulevard",
    city: "Kansas City",
    state: "Missouri",
    contact: "816-555-0130",
    email_id: "info@crestview.edu",
    image: "/placeholder.svg"
  }
]

async function main() {
  console.log('Starting seed...')
  
  // Clear existing data
  await prisma.school.deleteMany()
  console.log('Cleared existing schools')
  
  // Insert seed data
  for (const school of schools) {
    await prisma.school.create({
      data: school
    })
  }
  
  console.log(`Seeded ${schools.length} schools`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })