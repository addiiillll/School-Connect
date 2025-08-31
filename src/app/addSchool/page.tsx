'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, CheckCircle, XCircle, School, MapPin, Building, Phone, Mail, Image } from 'lucide-react'

type FormData = {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: FileList
}

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setMessage('')
    setMessageType('')

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('address', data.address)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('contact', data.contact)
    formData.append('email_id', data.email_id)
    formData.append('image', data.image[0])

    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setMessage('School added successfully! Redirecting to schools directory...')
        setMessageType('success')
        reset()
        // Redirect to show schools page after a short delay
        setTimeout(() => {
          router.push('/showSchools')
        }, 2000)
      } else {
        const errorData = await response.json()
        setMessage(errorData.error || 'Failed to add school')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Error occurred while adding school. Please try again.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Add New School</h1>
          <p className="text-lg text-gray-600">Help expand our school directory by adding a new school</p>
        </div>

        {message && (
          <Alert className={`mb-6 ${messageType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            {messageType === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={`${messageType === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>
              Please fill in all the required information about the school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">School Name *</Label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    {...register('name', { required: 'School name is required' })}
                    placeholder="Enter school name"
                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                  <Textarea
                    id="address"
                    {...register('address', { required: 'Address is required' })}
                    placeholder="Enter full address"
                    rows={3}
                    className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="city"
                      {...register('city', { required: 'City is required' })}
                      placeholder="Enter city"
                      className={`pl-10 ${errors.city ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="state"
                      {...register('state', { required: 'State is required' })}
                      placeholder="Enter state"
                      className={`pl-10 ${errors.state ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="contact"
                    type="tel"
                    maxLength={10}
                    {...register('contact', {
                      required: 'Contact number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter exactly 10 digits'
                      },
                      minLength: {
                        value: 10,
                        message: 'Contact number must be exactly 10 digits'
                      },
                      maxLength: {
                        value: 10,
                        message: 'Contact number must be exactly 10 digits'
                      }
                    })}
                    placeholder="Enter 10-digit phone number"
                    className={`pl-10 ${errors.contact ? 'border-red-500' : ''}`}
                    onInput={(e) => {
                      // Remove any non-numeric characters
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                      // Limit to 10 digits
                      if (target.value.length > 10) {
                        target.value = target.value.slice(0, 10);
                      }
                    }}
                    onKeyDown={(e) => {
                      // Allow navigation keys and backspace/delete
                      if (['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                        return;
                      }
                      // Prevent non-numeric characters from being typed
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                <p className="text-sm text-gray-500">Enter exactly 10 digits (numbers only)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email_id">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email_id"
                    type="email"
                    {...register('email_id', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    placeholder="Enter email address"
                    className={`pl-10 ${errors.email_id ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">School Image *</Label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none z-10" />
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image', { required: 'School image is required' })}
                    className={`pl-10 ${errors.image ? 'border-red-500' : ''} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                <p className="text-sm text-gray-500">Upload a clear image of the school (JPG, PNG, etc.)</p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Adding School...
                    </>
                  ) : (
                    <>
                      <School className="mr-2 h-5 w-5" />
                      Add School
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="px-8 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}