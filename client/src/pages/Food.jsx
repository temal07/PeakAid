import { Alert, Button, Table, TableHead, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Water() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sets any previous error to null
    setError(null);
    try {
      // Makes a POST request
      const res = await fetch(`/api/food/add-food/${currentUser._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setError(null);
        navigate(`/nutritions/view-all-food/${currentUser._id}`);        
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);      
    }
  }


  return (
    <div className='flex flex-col gap-5'>
      {/* Form */}
      <div className='ml-20'> 
        <div className='flex justify-center'>
          <h1 className='text-3xl mb-5'>Enter your Food Information Here:</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-20'>
          <TextInput
            type='text'
            placeholder='Food Name:'
            required
            id='name'
            className='flex-1'
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          /> 
          <TextInput
            type='text'
            placeholder='Calories:'
            required
            id='calories'
            className='flex-1'
            onChange={(e) => setFormData({...formData, calories: e.target.value})}
          />
          <Button 
            gradientDuoTone='purpleToPink'
            className='flex-1'
            type='submit'
          >
            Add Food
          </Button>
        </form>
      </div>
      <div className='flex justify-center mb-10'>
          <Link className='text-blue-500' to={`/nutritions/view-all-food/${currentUser._id}`}>
            See Your food Info:        
          </Link>
      </div>
    </div>
  )
}
