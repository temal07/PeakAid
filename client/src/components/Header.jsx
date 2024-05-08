import React from 'react'
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownDivider } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export default function Header() {
  const path = useLocation().pathname;
  // get the current user to update the header
  // if the user is logged in already, change the header.

  const { currentUser } = useSelector(state => state.user);

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
          <div className='flex gap-3'>
            { 
              currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'>Username: {currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>Email: {currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to={'/profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item>Log Out</Dropdown.Item>
                </Dropdown>
              ) : 
              <>
              <Link to='/sign-up'>
                <Button gradientMonochrome='cyan' outline>
                  Sign Up
                </Button>
              </Link>
                <Link to='/sign-in'>
                  <Button gradientDuoTone='greenToBlue' outline>
                    Sign In
                  </Button>
                </Link>
              </>
            }
          </div>
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