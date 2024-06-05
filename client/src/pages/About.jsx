import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='min-h-screen flex mt-10 justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div className='mt-10'>
          <span className='px-14 py-8 font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg text-6xl'>PeakAid</span>
          <h1 className='text-3xl mt-20 font font-semibold text-center my-7'>
            About PeakAid
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Peakaid. Peakaid is an online health website, where you
              can store your information regarding your health. 
              The information includes Water, Food and Exercise. Not only that, you can 
              also read and write blogs to shape your health information.
            </p>
            <p>
              Peakaid was created for ensuring health and well being for all at all ages.
              This is one of the goals of Sustainable Development Goals 2030.
            </p>
            <p>
                For more information, visit: 
                <Link to={'https://sdgs.un.org/2030agenda'} className='pl-2 text-blue-500'>
                    Sustainable Development Goals for 2030
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
