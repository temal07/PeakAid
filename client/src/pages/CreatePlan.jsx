import { Button, Label, Alert, Spinner, Avatar } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function CreatePlan() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // use the gemini's response
    const [responseData, setResponseData] = useState(null);
    //saved response from gemini
    const [savedResponse, setSavedResponse] = useState(null);
    const [saveInstantly, setSaveInstantly] = useState(false);
    const [isResponseSaved, setIsResponseSaved] = useState(false);

    const toggleSaveInstantly = () => {
        setSaveInstantly((prevValue) => !prevValue);
    };

    const handleSaveResponse = async () => {
        setIsResponseSaved(false);
        setErrorMessage(null);
        try {
            // We want to avoid the backend to save the gemini responses instantly.
            // Therefore, we'll set a flag that is set to false and we'll access the
            // flag in the backend. If the flag is true, then & only then the backend
            // will save the data.

            const res = await fetch('/api/generate/save-response', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    text: responseData.message, 
                    saveInstantly,
                }),
            });
            const data = await res.json();
    
            if (res.ok) {
                setSavedResponse(data);
                setSaveInstantly(true);
                setIsResponseSaved(true);
                setErrorMessage(null);
            } else {
                setErrorMessage('Failed to save response. Please try again later.');
                setSaveInstantly(false);
            }
        } catch (error) {
            setSaveInstantly(false);
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.prompt) {
            setErrorMessage('Please fill out the form!');
        }

        try {
            // Get the response from the backend
            setIsLoading(true);
            const res = await fetch('/api/generate/generate-plan', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ 
                    prompt: formData.prompt,
                    saveInstantly,
                }),
            });
            setIsLoading(false);
            // check if the res was successful

            if (res.ok) {
                const data = await res.json();
                setResponseData(data);
                setErrorMessage(null);
            } else {
                console.log('Request Failed:', res.statusText);
            }
        } catch (error) {
            setErrorMessage(error);
            setIsLoading(false);        
        }        
        // reset the textarea after the user sent the message
        setFormData({...formData});
    }

    // prettify the text gemini generates
    const prettifyText = (text) => {
        // Remove leading and trailing whitespace
        text = text.trim();
    
        // Remove leading and trailing stars
        text = text.replace(/^\*+|\*+$/g, '');
    
        // Replace consecutive stars with a single space
        text = text.replace(/\*+/g, ' ');
    
        // Replace consecutive whitespace characters with a single space
        text = text.replace(/\s+/g, ' ');
    
        // Remove any remaining leading or trailing whitespace
        text = text.trim();
    
        return text;
    };

  return (
    <div className='mt-20'>
        <div className="flex flex-row gap-20 md:items-center">
            <div>
                <div className='flex flex-col ml-60 mb-20'>
                    {/* Logo */}
                    <span className='self-center whitespace-nowrap text-sm sm:text-2xl font-semibold text-white px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-500 rounded-lg'>PeakAid</span>
                    {/* Text under the logo */}
                    <p className="text-sm mt-6 max-w-80">With Gemini Powered Assistant, start creating your perfect week!</p>
                </div>
                <Link to='/view-responses' className='text-blue-500 ml-60'>
                    View AI Responses
                </Link>
            </div>
            {/* Text Input */}
            <form className='flex flex-col p-20 gap-5' onSubmit={handleSubmit}>   
                <Label value='Enter what you wish...' className='text-2xl'/>
                <textarea 
                    id="prompt" 
                    rows="5" 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                    border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                    dark:focus:border-blue-500" 
                    placeholder="Start Generating your Weekly Plan!" 
                    onChange={handleChange}>
                </textarea>
                <Button gradientDuoTone='redToYellow' className='flex flex-wrap gap-2 text-gray-500' type='button' onClick={handleSubmit}>
                    {
                        isLoading ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading</span>
                            </>
                        ) : 
                        <>
                            Generate Your Weekly Plan
                        </>
                    }
                </Button>
                <div className="flex flex-col gap-4 border-t-2">
                    <div>
                        {
                            errorMessage && (
                            <Alert className='mt-5 opacity-100 transition-opacity duration-5000' color='failure'>
                                {errorMessage}
                            </Alert>
                            )
                        }
                    </div>
                    <div>
                        {
                            isResponseSaved && (
                                <div className="p-4">
                                    <Alert color='success' className={`opacity-100 transition-opacity duration-5000 animate-fade`}>
                                    {'The response has successfuly been saved!'}
                                    </Alert>
                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
        {/* Gemini Response */}
        <div className='flex flex-col gap-20'>
            {/* Display Gemini Response if available */}
            {responseData && (
                <div className="mb-20 max-w-max flex mr-40 ml-20">
                    <div>
                        <Avatar
                            alt='gemini'
                            img={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png`}
                            rounded
                            className='w-10 h-10 mr-4'
                        />
                    </div>
                    <div className="text-sm text-gray-900 bg-gray-300 p-4 rounded-lg">
                        {prettifyText(responseData.message)}
                    </div>
                    <div className="">
                        <Button onClick={() => {
                            toggleSaveInstantly();
                            handleSaveResponse(); 
                        }} type='button' className='w-10 h-10 px-2 py-0 ml-2'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}
