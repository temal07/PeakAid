import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import Welcome from '../components/Welcome';
import HomeComp from '../components/HomeComp';

export default function Home() {
  const { currentUser } = useSelector(state => state.user);

  // Fetch the blogs to pass them as props so that 
  // blogs can be accessed in HomeCom.jsx, too

  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('api/blog/get-blogs');
      const data = await res.json()

      if (res.ok) {
        console.log(data);
        setBlogs(data.blogs);
      } else {
        console.log(error.message);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className=''>
      {
        currentUser ? (
          <HomeComp key={blogs && blogs._id} blogs={blogs && blogs} />
        ) : (
          <Welcome />
        )
      }
    </div>
  )
}
