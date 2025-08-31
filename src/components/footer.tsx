'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Subscribe to our Newsletter</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Get updated about admission forms, deadlines and articles to help you through the process.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email here..."
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md transition-colors duration-200"
              >
                <Send className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Schools in India</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Other Schools in India</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Colleges in India</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Advertise With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Common Admissions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Edunify India</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">CGPA Converter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-300 mb-4 md:mb-0">
            Copyright • Uniform Ventures Pvt. Ltd.
          </div>
          <div className="text-2xl font-bold">
            <span className="text-white">School</span><span className="text-cyan-400">Connect</span>
          </div>
        </div>
      </div>
    </footer>
  )
}