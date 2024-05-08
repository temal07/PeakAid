import { GoogleAuthProvider ,signInWithPopup, getAuth } from 'firebase/auth';
import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // initialise the auth at the top before the function
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    // create a provider
    const provider = new GoogleAuthProvider();
    // This way, google will always ask you to select an account
    // instead of automatically loggin you in.
    provider.setCustomParameters({prompt: 'select_account'});

    try {
      // get the results from google
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      // get the response from Google
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          // get NECESSARY information
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        })
      });
      // set the data
      const data = res.json();
      // if the data is OK, we want to call signInWithSuccess function from the redux
      // by using the dispatch method
      if(res.ok) {
        // navigate to the home page
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(`Error during process: ${error.message}`));
    }
  }

  return (
    <Button gradientDuoTone={'pinkToOrange'} type='button' onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with Google
    </Button>
  )
}
