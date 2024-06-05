import { Button, Select, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ViewAllActivities from '../components/ViewAllActivities';
import { Link, useNavigate } from 'react-router-dom';

export default function Activities() {
  // set a formData state that will keep track of the changes
  // in the text input areas
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sets any previous errors to null
    setError(null);
    try {
      const res = await fetch(`/api/activity/add-activity/${currentUser._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });      

      const data = await res.json();

      if (res.ok) {
        setError(null);
        console.log(data);
        navigate(`/view-all-activities/${currentUser._id}`);
        setFormData({});
      } else {
        setError(true);
        console.log(data.message);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col mx-20 my-20'>
      <div className='mx-20 mb-10'>
        <h1 className='flex justify-center text-4xl md:text-6xl bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text font-semibold'>
          Welcome to Activities
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl'>Here, you can add the exercises you have done today!</h2>
            <TextInput 
              type='text'
              placeholder='Name:'
              required
              id='name'
              className='flex-1'
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            /> 
            <TextInput 
              type='text'
              placeholder='Calories Burnt:'
              required
              id='caloriesBurnt'
              className='flex-1'
              onChange={(e) => setFormData({...formData, caloriesBurnt: e.target.value})}
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
                <option value='uncatgeorised'>Select The Type</option>
                <option value='strength'>Strength Training</option>
                <option value="aerobic">Aerobic</option>
                <option value="swimming">Swimming</option>
                <option value="running">Running/Jogging</option>
                <option value="hiking">Hiking/Walking</option>
                <option value="pushup">Pushup</option>
                <option value="yoga">Yoga</option>
                <option value="meditation">Meditation</option>
                <option value="stretching">Stretching</option>
            </Select>
            <Button 
              type='submit'
              gradientDuoTone='purpleToBlue'
            >
              Add Exercise
            </Button>
          </div>
        </form>
        <div className='mb-20'>
          <Link to={`/view-all-activities/${currentUser._id}`}>
          
          </Link>
        </div>
    </div>
  )
}
