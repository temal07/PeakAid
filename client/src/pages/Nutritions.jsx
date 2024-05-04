import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Nutritions() {
  return (
    <div>
        <h1 className=" text-3xl text-red-500">Nutritions page</h1>
        <Outlet />
    </div>
  )
}
