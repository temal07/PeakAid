import React, { useState } from 'react';
import { Button, Alert } from 'flowbite-react';


export default function Gemini() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleGeminiClick = async () => {
        try {
            // Get the response from the backend
            setIsLoading(true);
            const res = await fetch('/api/generate/generate-plan', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
            });
            setIsLoading(false);
            // check if the res was successful

            if (res.ok) {
                const data = await res.json();
                console.log(data);
            } else {
                console.log('Request Failed:', res.statusText);
            }
        } catch (error) {
            setErrorMessage(error);
            setIsLoading(false);        
        }
    }

  return (
    <Button gradientDuoTone='purpleToOrange' type='button' onClick={handleGeminiClick}>
        {
            isLoading ? (
                <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading</span>
                </>
            ) : 
            <>
                <img 
                    src='https://www.digicloud.africa/wp-content/uploads/2024/02/Screenshot-2024-02-25-at-14.00.27-e1708863274782-400x271.png'
                    className='w-2 h-2'
                    alt="gemini_star_logo"
                />
                Generate Your Weekly Plan
            </>
        }
        {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
        }
    </Button>
  )
}
