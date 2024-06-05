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
import CreatePlan from './pages/CreatePlan';
import Profile from './pages/Profile';
import ViewAIResponses from './pages/ViewAIResponses';
import SingleBlog from './pages/SingleBlog';
import UpdateBlog from './pages/UpdateBlog';
import ViewAllFood from './components/ViewAllFood';
import UpdateFood from './pages/UpdateFood';
import ViewAllActivities from './components/ViewAllActivities';
import UpdateActivity from './pages/UpdateActivity';

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
          <Route path='view-all-food/:id' element={<ViewAllFood />} />
          <Route path='update-food/:foodId' element={<UpdateFood />} />
        </Route>
        <Route path='/view-responses/:id' element={<ViewAIResponses />} />
        {/* For users all blogs */}
        <Route path='/blogs/:id' element={<Blog />} />
        {/* For a single blog */}
        <Route path='/blog/:blogSlug' element={<SingleBlog />}/>
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/update-blog/:blogId' element={<UpdateBlog />} />
        <Route path='/create-plan' element={<CreatePlan />} />
        <Route path='/activities/:id' element={<Activities />} />
        <Route path='/view-all-activities/:id' element={<ViewAllActivities />} />
        <Route path='/update-activity/:id' element={<UpdateActivity />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
