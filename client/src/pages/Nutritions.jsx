import { Navbar } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useLocation, Link } from 'react-router-dom'

export default function Nutritions() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=''>
        <div className='flex flex-col gap-10'>
            <div className='mx-20 mt-10'>
              <h1 className='flex justify-center text-4xl md:text-6xl bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text font-semibold'>
                Welcome to Nutritions
              </h1>
            </div>
            <div className='ml-20'>
                <p className='font-radio-canada-big text-2xl'>
                  Here, you can keep track of your
                  food and water amount. 
                </p>
            </div>
            <div className='flex justify-around'>
              <Navbar>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Navbar.Link
                    active={path === `/nutritions/water/${currentUser._id}`}
                    as={'div'}
                  >
                    <Link className={`text-4xl`} to={`water/${currentUser._id}`}>
                      Water
                    </Link>
                  </Navbar.Link>
                  <Navbar.Link
                    active={path === `/nutritions/food/${currentUser._id}`}
                    as={'div'}
                  >
                    <Link className={`text-4xl`} to={`food/${currentUser._id}`}>
                      Food
                    </Link>
                  </Navbar.Link>
                </Navbar.Collapse>
              </Navbar>
            </div>
            {/* Use Outlet to display the pages water and food */}
            <Outlet />
        </div>
    </div>
  )
}
