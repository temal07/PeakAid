import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

// this is the main home page
// Blog.jsx will be for displaying user's blogs.

export default function HomeComp({ blogs }) {
  const { currentUser } = useSelector((state) => state.user);
  // set a state for displaying different messages
  // depending upon the hour 
  const [hour, setHour] = useState(null);

  useEffect(() => {
    const hourLogic = () => {
      const getHour = new Date().getHours();
      setHour(getHour);
    }

    hourLogic();
  }, []);

  // implement the function where the greeting will change depending on the hour
  const getGreeting = (hour) => {
    if (hour >= 0 && hour < 4) {
      return 'Good Night';
    } else if (hour >= 4 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }


  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-wl-6 mx-auto'>
        <h1 className='text-4xl md:text-6xl font-radio-canada-big gradient-text flex justify-center'>
          {getGreeting(hour)}, {currentUser.username}
        </h1>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {
            blogs && blogs.length > 0 && (
              <div className='flex flex-col gap-6'>
                <div>
                  <h2 className='text-2xl font-semibold text-left'>Recent Blogs</h2>
                  <p className='text-xl'>Here are some starting blogs that can keep you engaged:</p>
                </div>
                <div className='flex flex-row sm:flex-wrap gap-4 justify-center'>
                  {
                    blogs.map((blog) => (
                      <BlogCard key={blog.id} blog={blog} />
                    )).splice(0, 3)
                  }
                </div>
                <div>
                  <h2 className='text-2xl font-semibold text-left'>Need some assistance?</h2>
                  <p className='text-xl'>
                    Don't worry! With Google's Gemini, you can
                    get the best advice whenever you want! 
                  </p>
                  <Link to='/create-plan' className='text-teal-500'>
                    Try Gemini now! 
                  </Link>
                </div>
              </div>
            ) 
          }
        </div>        
      </div>
    </div>
  )
}
