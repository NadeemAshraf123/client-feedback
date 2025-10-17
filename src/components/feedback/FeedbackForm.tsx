import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../app/Store'
import { addFeedback } from '../../features/FeedbackSlice'
import { useNavigate } from 'react-router-dom'

type Errors = {
  clientName?: string
  message?: string
  rating?: string
}

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [clientName, setClientName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [rating, setRating] = useState<number>(5)

  
  const [errors, setErrors] = useState<Errors>({})

  
  const validateClientName = (name: string): string | undefined => {
    if (!name.trim()) return 'Client name is required.'
    if (name.trim().length < 3) return 'Name must be at least 3 characters.'
    if (name.trim().length > 50) return 'Name must be 50 characters or less.'
    return undefined
  }

  const validateMessage = (msg: string): string | undefined => {
    if (!msg.trim()) return 'Message is required.'
    if (msg.trim().length < 10) return 'Message must be at least 10 characters.'
    if (msg.trim().length > 500) return 'Message exceeds max length (500).'
    return undefined
  }

  const validateRating = (r: number): string | undefined => {
    if (Number.isNaN(r)) return 'Rating must be a number.'
    if (!Number.isInteger(r)) return 'Rating must be an integer.'
    if (r < 1 || r > 5) return 'Rating must be between 1 and 5.'
    return undefined
  }

  
  const validateForm = (): boolean => {
    const e: Errors = {}
    const nameErr = validateClientName(clientName)
    const msgErr = validateMessage(message)
    const ratingErr = validateRating(rating)

    if (nameErr) e.clientName = nameErr
    if (msgErr) e.message = msgErr
    if (ratingErr) e.rating = ratingErr

    setErrors(e)
    return Object.keys(e).length === 0
  }

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    
    if (!validateForm()) {
    
      const firstError = document.querySelector<HTMLInputElement | HTMLTextAreaElement>('.error-field')
      firstError?.focus()
      return
    }

    const date = new Date().toISOString()
    dispatch(addFeedback({ clientName: clientName.trim(), message: message.trim(), rating, date }))


    setClientName('')
    setMessage('')
    setRating(5)
    setErrors({})
    navigate('/')
  }


  const handleNameChange = (value: string) => {
    setClientName(value)
    if (errors.clientName) {
    
      setErrors(prev => ({ ...prev, clientName: validateClientName(value) }))
    }
  }

  const handleMessageChange = (value: string) => {
    setMessage(value)
    if (errors.message) {
      setErrors(prev => ({ ...prev, message: validateMessage(value) }))
    }
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: validateRating(value) }))
    }
  }

  return (
    <>
    
    <div className=' p-5'>

    <form onSubmit={handleSubmit} className="bg-gray-100 p-4  rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>

      <label className="block mb-2">
        <span className="text-sm font-medium">Client Name</span>
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={() => setErrors(prev => ({ ...prev, clientName: validateClientName(clientName) }))}
          className={`w-full mb-1 p-2 border rounded ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.clientName}
          aria-describedby="clientName-error"
          
          {...(errors.clientName ? { className: 'error-field w-full mb-1 p-2 border rounded border-red-500' } : {})}
        />
      </label>
      {errors.clientName && (
        <p id="clientName-error" className="text-red-600 text-sm mb-2">
          {errors.clientName}
        </p>
      )}

      <label className="block mb-2">
        <span className="text-sm font-medium">Message</span>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          onBlur={() => setErrors(prev => ({ ...prev, message: validateMessage(message) }))}
          className={`w-full mb-1 p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
          rows={5}
        />
      </label>
      {errors.message && (
        <p id="message-error" className="text-red-600 text-sm mb-2">
          {errors.message}
        </p>
      )}

      <label className="block mb-4">
        <span className="text-sm font-medium">Rating (1-5)</span>
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
          onBlur={() => setErrors(prev => ({ ...prev, rating: validateRating(rating) }))}
          className={`w-full mb-1 p-2 border rounded ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!errors.rating}
          aria-describedby="rating-error"
        />
      </label>
      {errors.rating && (
        <p id="rating-error" className="text-red-600 text-sm mb-2">
          {errors.rating}
        </p>
      )}

      <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
    </div>
    </>
  )
}

export default FeedbackForm
