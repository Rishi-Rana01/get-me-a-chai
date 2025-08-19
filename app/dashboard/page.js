"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'


const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    React.useEffect(() => {
        if (!session) {
            router.push('/login')
        }
    }, [session, router]);


    return (
        
       <div className='max-w-2xl mx-auto p-6 '>
    {/* Welcome to your dashboard */}
    <h1 className="text-2xl font-bold text-center py-3 text-white">Welcome to your dashboard</h1>
    
    {/* Form fields */}
    <div className="space-y-3 mt-3">
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input 
                type="text" 
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400" 
                placeholder="Enter your name"
            />
        </div>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
                type="email" 
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400" 
                placeholder="Enter your email"
            />
        </div>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input 
                type="text" 
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400" 
                placeholder="Choose a username"
            />
        </div>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Profile Picture</label>
            <input 
                type="file" 
                accept="image/*"
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" 
            />
        </div>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Cover Picture</label>
            <input 
                type="file" 
                accept="image/*"
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" 
            />
        </div>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Razorpay Key</label>
            <input 
                type="text" 
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400" 
                placeholder="Enter your Razorpay key"
            />
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-4">
            Save Changes
        </button>
    </div>
</div>
        
    )
}

export default Dashboard
