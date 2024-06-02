import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { currentUser } = useSelector(state => state.user); 

  return (
    <div className='flex flex-col sm:justify-center items-center md:flex-row gap-20 my-10'>
        {/* User profile Pciture */}        
        <div className="">
            <div className=''>
                <img 
                    src={currentUser.profilePicture}
                    alt='user_profile_picture'
                    className='w-40 h-40 rounded-3xl'
                />
            </div>
        </div>
        {/* User Information */}
        <div className="flex flex-col gap-10">
            <div className='sm:whitespace-nowrap mr-56'>
                <h1 className='text-3xl ml-20'>User Information:</h1>
                <div className='ml-20 border border-gray-500 rounded-lg border-height'></div>
                <div className='ml-20'>
                    <li className='text-xl whitespace-nowrap'>Username: 
                        <span className='font-bold pl-2'>{currentUser.username}</span>
                    </li>
                    <li className='text-xl whitespace-nowrap'>Email:
                        <span className='font-bold pl-2'>{currentUser.email}</span>
                    </li>
                </div>
            </div>
            <div className='sm:whitespace-nowrap mr-56'>
                <h1 className='text-3xl ml-20'>User Health Information:</h1>
                <div className='ml-20 border border-gray-500 rounded-lg border-height'></div>
                <div className='ml-20'>
                    <li className='text-xl whitespace-nowrap'>Water Information: 
                        <Link to={`/nutritions/water/${currentUser._id}`} className='text-blue-500 pl-2'>See Water Info</Link>
                    </li>
                    <li className='text-xl whitespace-nowrap'>Food Information: 
                        <Link to={`/nutritions/food/${currentUser._id}`} className='text-blue-500 pl-2'>See Food Info</Link>
                    </li>
                    <li className='text-xl whitespace-nowrap'>Activities Information: 
                        <Link to={`/activities/${currentUser._id}`} className='text-blue-500 pl-2'>See Activity Info</Link>
                    </li>
                </div>
            </div>
            <div className='sm:whitespace-nowrap mr-6'>
                <h1 className='text-3xl ml-20'>Blogs Posted:</h1>
                <div className='ml-20 border border-gray-500 rounded-lg border-height'></div>
                <div className='ml-20'>
                    <p className='text-2xl'>This person has posted {currentUser.amountOfBlog} {
                        currentUser.amountOfBlog > 1 || currentUser.amountOfBlog === 0  ? (
                            'blogs'
                        ) : (
                            'blog'
                        )
                    }</p>
                    <Link to={`/blogs/${currentUser._id}`} className='text-blue-500'>See this person's blogs</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
