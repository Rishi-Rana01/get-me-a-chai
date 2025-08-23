"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = "Sign Up - Get Me A Chai"
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Auto-generate username from email when email changes
        if (name === 'email' && value.includes('@')) {
            const suggestedUsername = value.split('@')[0].toLowerCase()
            setFormData(prev => ({
                ...prev,
                username: suggestedUsername
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Form validation
        if (!formData.name || !formData.email || !formData.username || !formData.password) {
            toast.error("All fields are required")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }

        if (!formData.email.includes('@')) {
            toast.error("Please enter a valid email address")
            return
        }

        try {
            setLoading(true)
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success("Account created successfully!")
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            } else {
                toast.error(data.message || "Failed to create account")
            }
        } catch (error) {
            console.error("Signup error:", error)
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='dark:text-white light:text-black py-14 container mx-auto'>
            <ToastContainer position="top-center" autoClose={3000} />
            <h1 className='text-center font-bold text-3xl mb-8'>Create Your Account</h1>

            <div className="flex flex-col items-center justify-center p-4 md:p-10">
                <div className="w-full max-w-md p-6 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 light:bg-white text-white light:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 light:bg-white text-white light:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 light:bg-white text-white light:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="johndoe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 light:bg-white text-white light:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 dark:bg-gray-700 light:bg-white text-white light:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl text-white font-medium rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-500 hover:text-blue-400">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup