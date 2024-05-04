import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nutritions from './pages/Nutritions';
import Water from './pages/Water';
import Food from './pages/Food';
import Blog from './pages/Blog';
import Sleep from './pages/Sleep';
import Activities from './pages/Activities';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/nutritions' element={<Nutritions />}>
          <Route path='water' element={<Water />} />
          <Route path='food' element={<Food />} />
        </Route>
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/sleep' element={<Sleep />} />
        <Route path='/activities' element={<Activities />} />
      </Routes>
    </BrowserRouter>
  )
}
