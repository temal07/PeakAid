import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="flex gap-20 sm:flex-row p-8">
        <div className='flex-1'>
        {/* Logo */}
        <div className='mb-8 whitespace-nowrap text-lg sm:text-xl font-semibold text-white'>
            <span className='px-6 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg'>PeakAid</span>       
        </div>
        {/* Text */}
        <div className='flex flex-col'>
        <div className='text-wrap'>
            <h1 className='font-radio-canada-big text-6xl mb-4'>Welcome to Peakaid!</h1>
        </div>
        <div className='mb-4'>
            <p className='font-radio-canada-big text-2xl mb-2'>
            Peakaid is a wellness software that ensures the well-being and health for all at all ages.
            </p>
            <p className='font-radio-canada-big text-2xl mb-2'>
            With Peakaid, you can:
            </p>
            <ul className='font-radio-canada-big text-xl list-disc list-inside'>
            <li className='mb-2'>Keep track of your nutritions and the amount of water you drink</li>
            <li className='mb-2'>Create your own blogs</li>
            <li className='mb-2'>Read other people's blogs</li>
            <li className='mb-2'>Keep track of your exercises</li>
            <li>Keep track of your sleep</li>
            </ul>
        </div>
        </div>
        <div className='mt-8'>
        <span className='font-radio-canada-big'>
            To start, <Link to='/sign-up' className='text-blue-500'>create an account</Link>.
            If you already have one, you can <Link to='/sign-in' className='text-blue-500'>sign in here</Link>.
        </span>
        </div>
    </div>
    </div>
  )
}
