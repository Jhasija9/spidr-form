"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, CheckCircle, EyeOff, Eye } from "lucide-react"


interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  airFryerCost: string
  spidrPin: string
}

interface FormErrors {
  firstName: string
  lastName: string
  phone: string
  email: string
  airFryerCost: string
  spidrPin: string
}

interface FormValid {
  firstName: boolean
  lastName: boolean
  phone: boolean
  email: boolean
  airFryerCost: boolean
  spidrPin: boolean
}

export default function SpidrForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    airFryerCost: "",
    spidrPin: "",
  })

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    airFryerCost: "",
    spidrPin: "",
  })

  const [valid, setValid] = useState<FormValid>({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    airFryerCost: false,
    spidrPin: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPin, setShowPin] = useState(false)


  // Validation functions
  const validateName = (name: string, fieldName: string): { isValid: boolean; error: string } => {
    const trimmed = name.trim()
  
    if (!trimmed) {
      return { isValid: false, error: `${fieldName} is required` }
    }
  
    if (!/^[a-zA-Z.\s]+$/.test(trimmed)) {
      return { isValid: false, error: "Only letters and spaces are allowed" }
    }
  
    return { isValid: true, error: "" }
  }
  

  const validatePhone = (phone: string): { isValid: boolean; error: string } => {
    if (!phone.trim()) {
      return { isValid: false, error: "Phone number is required" }
    }
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length !== 10) {
      return { isValid: false, error: "Please enter a valid phone number" }
    }
    return { isValid: true, error: "" }
  }

  const validateEmail = (email: string): { isValid: boolean; error: string } => {
    if (!email.trim()) {
      return { isValid: false, error: "Email address is required" }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" }
    }
    return { isValid: true, error: "" }
  }

  const validateCost = (cost: string): { isValid: boolean; error: string } => {
    if (!cost.trim()) {
      return { isValid: false, error: "Air Fryer cost is required" }
    }
    const numCost = Number.parseFloat(cost)
    if (isNaN(numCost) || numCost < 0.01) {
      return { isValid: false, error: "Air Fryer cost must be at least $0.01" }
    }
    return { isValid: true, error: "" }
  }

  const validatePin = (pin: string): { isValid: boolean; error: string } => {
    if (!pin.trim()) {
      return { isValid: false, error: "Spidr PIN is required" }
    }
    const cleaned = pin.replace(/\D/g, "")
    if (cleaned.length !== 16) {
      return { isValid: false, error: "PIN must be 16 digits in format ####-####-####-####" }
    }
    return { isValid: true, error: "" }
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`
    }
    return value
  }

  // Format PIN as user types
  const formatPin = (value: string): string => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16)
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3], match[4]].filter(Boolean).join("-")
    }
    return value
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value

    if (field === "phone") {
      formattedValue = formatPhoneNumber(value)
    } else if (field === "spidrPin") {
      formattedValue = formatPin(value)
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))

    // Validate field
    let validation: { isValid: boolean; error: string }
    switch (field) {
      case "firstName":
        validation = validateName(formattedValue, "First name")
        break
      case "lastName":
        validation = validateName(formattedValue, "Last name")
        break
      case "phone":
        validation = validatePhone(formattedValue)
        break
      case "email":
        validation = validateEmail(formattedValue)
        break
      case "airFryerCost":
        validation = validateCost(formattedValue)
        break
      case "spidrPin":
        validation = validatePin(formattedValue)
        break
      default:
        validation = { isValid: true, error: "" }
    }

    setErrors((prev) => ({ ...prev, [field]: validation.error }))
    setValid((prev) => ({ ...prev, [field]: validation.isValid }))
  }

  // Check if form is valid
  const isFormValid = Object.values(valid).every(Boolean)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)

    
    // Log form data
    console.log("Form submitted:", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      airFryerCost: `$${formData.airFryerCost}`,
      spidrPin: btoa(formData.spidrPin),
    })

    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      airFryerCost: "",
      spidrPin: "",
    })
    setErrors({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      airFryerCost: "",
      spidrPin: "",
    })
    setValid({
      firstName: false,
      lastName: false,
      phone: false,
      email: false,
      airFryerCost: false,
      spidrPin: false,
    })

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center px-4 py-10">
    {/* Branding Section */}
    <div className="flex flex-col items-center mb-6">
      {/* Hanging spider */}
      <div className="relative h-24 w-6">
        <div className="absolute w-px h-16 bg-gray-500 top-0 left-1/2 transform -translate-x-1/2" />
        <img
          src="https://spidr.design/build/images/spidr-logo.png"
          alt="Spidr Logo"
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-6"
        />
      </div>

      {/* Spidr Title */}
      <img
        src="https://spidr.design/build/images/spidr-title.png"
        alt="Spidr Title"
        className="w-36 mt-2"
      />
    </div>

    {/* Form Container */}
    <div className="w-full max-w-[500px] space-y-6 bg-[#121212] border border-[#2A2A2A] rounded-xl shadow-lg p-8">
      <h2 className="text-white text-2xl font-semibold text-center mb-4">
        Behold: The SpidrFry™ 9000
      </h2>




        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-white">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter your first name"
              className={`w-full px-4 py-3 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.firstName ? "border-red-500" : valid.firstName ? "border-green-500" : "border-gray-700"
              }`}
            />
            {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-white">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter your last name"
              className={`w-full px-4 py-3 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.lastName ? "border-red-500" : valid.lastName ? "border-green-500" : "border-gray-700"
              }`}
            />
            {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-white">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="e.g. (123) 456-7890"
              className={`w-full px-4 py-3 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.phone ? "border-red-500" : valid.phone ? "border-green-500" : "border-gray-700"
              }`}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.email ? "border-red-500" : valid.email ? "border-green-500" : "border-gray-700"
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Air Fryer Cost */}
          <div className="space-y-2">
            <label htmlFor="airFryerCost" className="block text-sm font-medium text-white">
              Guess the Air Fryer's Cost
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">$</span>
              <input
                id="airFryerCost"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.airFryerCost}
                onChange={(e) => handleInputChange("airFryerCost", e.target.value)}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-3 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
                  errors.airFryerCost ? "border-red-500" : valid.airFryerCost ? "border-green-500" : "border-gray-700"
                }`}
              />
            </div>
            {errors.airFryerCost && <p className="text-red-400 text-sm">{errors.airFryerCost}</p>}
          </div>

          
          <div className="space-y-2">
  <label htmlFor="spidrPin" className="block text-sm font-medium text-white">
    Spidr PIN
  </label>
  <div className="relative">
    <input
      id="spidrPin"
      type={showPin ? "text" : "password"}
      value={formData.spidrPin}
      onChange={(e) => handleInputChange("spidrPin", e.target.value)}
      placeholder="####-####-####-####"
      maxLength={19}
      className={`w-full px-4 py-3 pr-12 bg-[#2A2A2A] border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 ${
        errors.spidrPin ? "border-red-500" : valid.spidrPin ? "border-green-500" : "border-gray-700"
      }`}
    />
    <button
      type="button"
      onClick={() => setShowPin(!showPin)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
      tabIndex={-1}
    >
      {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
  <p className="text-gray-400 text-xs">Enter your 16-digit PIN like 1234-5678-9012-3456</p>
  {errors.spidrPin && <p className="text-red-400 text-sm">{errors.spidrPin}</p>}
</div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform ${
              isFormValid && !isSubmitting
                ? "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-5 h-5" />
            <span>Submitted successfully!</span>
          </div>
        )}
      </div>
    </div>
  )
}

