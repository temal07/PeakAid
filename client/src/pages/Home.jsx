import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import Welcome from '../components/Welcome';

export default function Home() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className=''>
      {
        currentUser ? (
            <Blog />
        ) : (
          <Welcome />
        )
      }
    </div>
  )
}
