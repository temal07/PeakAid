import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ViewAIResponses() {
  // use a state for the UI. This state will display the
  // response data that'll come from backend
  const [error, setError] = useState(null);
  const [allResponses, setAllResponses] = useState(null);

  useEffect(() => {
    const handleGettingResponse = async () => {
      // Get the response from the backend.
      try {
        setError(null);
        const res = await fetch('/api/generate/view-responses');
        const data = await res.json();
  
        if(res.ok) {
          const responseData = data.map(item => item.response);
          setAllResponses(responseData);
          console.log(data);
        } else {
          setError("Couldn't fetch the data, please try again later...");
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleGettingResponse();
  }, []);

  const handleDeleteResponse = async () => {

  }

  return (
    <div className='flex flex-col'>
      {/* Text */}
      <div className='flex ml-20 sm:mx-20'> 
        <span className='text-3xl mt-5'>Here is Gemini's responses</span>
      </div>  
      <div className='flex flex-col mx-20 mb-20'>
        <div>
            {
              allResponses ? allResponses.map((response, index) => (
                <div className="flex flex-row items-center">
                  <div className='mt-10 bg-gray-300 rounded-md px-5 py-5 text-wrap max-w-max' key={index}>
                    {response}
                  </div>
                  <div className=''>
                      <Button 
                        type='button'
                        className='w-10 h-10 px-2 py-0 ml-2 mt-12'
                        gradientMonochrome='failure'
                        onClick={handleDeleteResponse}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 3 30 30">
                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                      </Button>
                  </div>
                </div>
              )) : (
                <div className='ml-20 p-20'>
                    <h1>Looks like you didn't try Gemini!</h1>
                    <Link to='/create-plan' className='text-blue-500'>
                      Try now for free!
                    </Link>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}
