import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  // necessary states and a naviagtion function
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  
  // we want to get a response from the
  // backend. That's why the handleSubmit
  // is an async function
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the page from reloading

    // if user doesn't provide any username, email, or password
    // return the error message

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all the fields!');
    }

    // create a try-catch block that connects
    // to the backend and gets the response

    try {
      setLoading(true);
      setErrorMessage(null);
      
      // try to get the response from the backend
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // use the success key that is in the backend
      // (index.js, app.use() for error handling)
      if (data.success === false) {
        // use the message key that comes from
        // the backend and display the message
        // if success is false
        return setErrorMessage(data.message);
      }
      setLoading(false);
      // if the response is successful
      // navigate the user to the home page
      if(res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  } 

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-5 max-w-3xl flex-col gap-5'>
        {/* left side includes the logo */}
        <div className='flex-1'>
          <span className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-white px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg'>PeakAid</span>
          <p className='text-sm mt-6'>
            Signup with your email and password or Google
          </p>
        </div>
        {
          /*
            Right side includes signup credentials
            which are the username, email and password
          */
        }
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Label value='Your username:' />
            <TextInput 
              type='text'
              placeholder='Username:'
              id='username'
              onChange={handleChange}
            />
            <Label value='Your email:' />
            <TextInput 
              type='email'
              placeholder='E.g. business@gmail.com'
              id='email'
              onChange={handleChange}
            />
            <Label value='Your password:' />
            <TextInput 
              type='password'
              placeholder='*********'
              id='password'
              onChange={handleChange}
            />
            <Button gradientDuoTone={'purpleToBlue'} type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading</span>
                  </>
                ) : 'Create an Account'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-4 border-t-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
          {/* use conditional rendering */}
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
