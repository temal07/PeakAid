import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, TextInput, Label, Spinner } from "flowbite-react";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
    /*
        Use Redux to handle state globally
        The state is coming from userSlice.js and
        error, loading and user are defined 


    */
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the page from reloading
    
        // if user doesn't provide any username, email, or password
        // return the error message
    
        if (!formData.email || !formData.password) {
          return dispatch(signInFailure('Please fill out all the fields!'));
        }
    
        // create a try-catch block that connects
        // to the backend and gets the response
    
        try {
            dispatch(signInStart());
            
            // try to get the response from the backend
            const res = await fetch('/api/auth/signin', {
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
                return dispatch(signInFailure(data.message));
            }
            // if the response is successful
            // navigate the user to the home page
            if(res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
          dispatch(signInFailure(error.message));
        }
      } 

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
                {/* left side includes the logo */}
                <div className='flex-1'>
                    <span className='px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-white'>PeakAid</span>
                    <p className='text-sm mt-6'>
                        Signin with your email and password or Google
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
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className="text-blue-500">
                        Sign Up
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