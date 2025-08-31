# School Connect 🏫

A modern web application for managing and discovering schools, built with Next.js and MySQL. Users can add new schools to the directory and browse through existing schools with advanced search and filtering capabilities.

## 🚀 Features

### 📝 Add School Page
- **React Hook Form** with comprehensive validation
- **Image Upload** with storage in `schoolImages` folder
- **Form Validation**: Email validation, 10-digit phone number validation, required fields
- **Responsive Design** that works on mobile and desktop
- **Success/Error Feedback** with automatic redirection

### 🔍 Show Schools Page
- **E-commerce Style Layout** displaying schools as product cards
- **Advanced Search** by school name, city, address
- **Filter Options** by city and state with dropdown menus
- **Pagination** for better performance and navigation
- **Active Filters Display** with individual removal options
- **Image Hover Effects** with zoom animation
- **Responsive Grid Layout** adapting to all screen sizes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **UI Components**: Custom components with Radix UI
- **Image Handling**: Next.js Image optimization

## 📋 Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  email_id VARCHAR(255) UNIQUE NOT NULL,
  image TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/school_connect"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
school-connect/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school page
│   │   ├── showSchools/        # Display schools page
│   │   ├── api/schools/        # API routes
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── school-card.tsx     # School display card
│   │   ├── school-search.tsx   # Search and filter component
│   │   └── pagination.tsx      # Pagination component
│   └── lib/
│       ├── prisma.ts           # Database connection
│       └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma           # Database schema
├── public/
│   └── schoolImages/           # Uploaded school images
└── README.md
```

## 🎯 API Endpoints

### POST /api/schools
Add a new school to the database
- **Body**: FormData with school details and image file
- **Response**: Created school object

### GET /api/schools
Retrieve schools with optional filtering and pagination
- **Query Parameters**:
  - `search`: Search term for name/city/address
  - `city`: Filter by city
  - `state`: Filter by state
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1280px+)

## 🔧 Key Features Implementation

### Form Validation
- Email format validation using regex
- Phone number validation (exactly 10 digits)
- Required field validation
- Real-time error display

### Image Handling
- File upload with validation
- Automatic image storage in `public/schoolImages/`
- Fallback placeholders for missing images
- Image optimization with Next.js Image component

### Search & Filtering
- Debounced search input (500ms delay)
- Multiple filter options (city, state)
- Active filter display with removal options
- URL parameter synchronization

### Performance Optimizations
- Pagination to limit data loading
- Image lazy loading
- Debounced search queries
- Efficient database queries with Prisma

## 🚀 Deployment


Make sure to:
1. Set up your production database
2. Configure environment variables
3. Run database migrations
4. Build the application
