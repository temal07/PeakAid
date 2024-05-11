import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nutritions from './pages/Nutritions';
import Water from './pages/Water';
import Food from './pages/Food';
import Blog from './pages/Blog';
import Activities from './pages/Activities';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateBlog from './pages/CreateBlog';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/nutritions' element={<Nutritions />}>
          <Route path='water/:id' element={<Water />} />
          <Route path='food/:id' element={<Food />} />
        </Route>
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/activities:id' element={<Activities />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
