import React from 'react'
import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
        {/* Logo */}
        <Link to='/' className="border-t-8 border-b-4 self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-white">
          <span className='px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg'>PeakAid</span>
        </Link>
        {/* Search Bar */}
        <form>
          <TextInput 
            type='text'
            placeholder='Search'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        {/* Signin button */}
        <div className='flex gap-2 md:order-2'>
          <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue' outline>
              Sign In
            </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path ==="/"} as={'div'}>
              <Link to='/'>
                Home
              </Link>
          </Navbar.Link>
          <Navbar.Link active={path ==="/nutritions"} as={'div'}>
              <Link to='/nutritions'>
                Nutritions
              </Link>
          </Navbar.Link>
          <Navbar.Link active={path ==="/activities"} as={'div'}>
              <Link to='/activities'>
                Activities
              </Link>
          </Navbar.Link>
          <Navbar.Link active={path==='/create-blog'} as={'div'}>
              <Link to='create-blog'>
                Create Blog
              </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}