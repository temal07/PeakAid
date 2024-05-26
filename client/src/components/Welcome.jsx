import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="flex sm:flex-row p-8">
        <div className='flex-1'>
            {/* Text */}
            <div className=''>
                <div>
                    <div className='flex flex-col gap-6 p-28 px-3 max-wl-6 mx-auto'>
                        <h1 className='text-4xl md:text-6xl font-radio-canada-big gradient-text flex justify-center font-'>✨Welcome to Peakaid✨</h1>
                        <div className=''>
                        <p className='text-xl flex items-center mx-auto max-w-6xl'>
                            Peakaid is a health website where you can show your
                            social status with blogs, interact with the newest
                            AI Model from Google, Gemini, and last but not least,
                            manage your exercise, water, and food information.
                        </p>
                        </div>        
                        <div className='mx-auto ml-14'>
                            <p className='font-radio-canada-big text-2xl mb-2'>
                            With Peakaid, you can:
                            </p>
                            <ul className='font-radio-canada-big text-xl list-disc list-inside'>
                            <li className='mb-2'>Keep track of your nutritions and the amount of water you drink</li>
                            <li className='mb-2'>Create your own blogs</li>
                            <li className='mb-2'>Read other people's blogs</li>
                            <li className='mb-2'>Keep track of your exercises</li>
                            <li className='mb-2 gradient-text text-2xl'><h1>Interact with the newest AI Model of Google: Gemini</h1></li>
                            </ul>
                        </div>
                        <span className='font-radio-canada-big ml-14 text-xl'>
                            To start, <Link to='/sign-up' className='text-blue-500'>create an account</Link>.
                            If you already have one, you can <Link to='/sign-in' className='text-blue-500'>sign in here</Link>.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
