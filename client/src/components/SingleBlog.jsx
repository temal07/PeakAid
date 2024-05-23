import React from 'react'
import { useSelector } from 'react-redux'

export default function SingleBlog() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      {currentUser._id}
    </div>
  )
}
