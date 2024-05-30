import { Alert, Button, Table, TableHead } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Water() {
  // sets necessary states: waterAmount will store the water amount in 
  // the frontend

  // A form data for sending the water amount to the backend
  const [formData, setFormData] = useState({
    waterAmount: null,
  });
  // State for most recent water id
  const [waterId, setWaterId] = useState(null);
  // Sets the previous water amounts
  const [previousWater, setPreviousWater] = useState(null);
  // Gets the current user's info
  const { currentUser } = useSelector((state) => state.user);  
  // Any possible errors will be displayed in the client side, too.
  const [error, setError] = useState(null);

  // Fetches the water amount
  useEffect(() => {
    const fetchWaterAmount = async () => {
      try {
        // A GET request is sent to the backend (server) 
        const res = await fetch(`/api/water/get-water/${currentUser._id}`);
        // JSONifies the data
        const data = await res.json();
        // If the response comes back successfully, logs and sets (to the state) the data;
        if (res.ok) {
          console.log(data);
          const eachId = data.map(item => item._id);
          setFormData({waterAmount: data[0].waterAmount});
          setPreviousWater(data.slice(1));
          // I set the index to 0 because 
          // users will update their most recent water amount
          setWaterId(eachId[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchWaterAmount();
  }, [currentUser._id]);

  // Both handleDeleteAmount and handleAddAmount 
  // will be asynchronous because they will update 
  // the water amount in the backend

  // These functions are updating the most recent water information (the 
  //  most up-to-date)

  const handleDeleteAmount = async () => {
    try {
      const res = await fetch(`/api/water/delete-water-amount/${waterId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ waterAmount : 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        console.log(waterId);
        setFormData((prevData) => ({ ...prevData, waterAmount: prevData.waterAmount - 1 }));
      } else {
        console.log('There was an error during the fetching process. Please try again');
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleAddAmount = async () => {
    // Sends a POST request to the backend
    try {
      const res = await fetch(`/api/water/add-water-amount/${waterId}/${currentUser._id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          waterAmount: 1,
        }),
      });
      const data = await res.json();
      
      // Logs the data if the response is OK.
      if (res.ok) {
        console.log(data);
        setFormData((prevData) => ({ ...prevData, waterAmount: prevData.waterAmount + 1 }));
      }
    } catch (error) {
      console.log(error);      
    }
  }

  // Add a handleSubmit function for sending the recent water info
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    try {
      const res = await fetch(`/api/water/add-water/${currentUser._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ waterAmount: formData.waterAmount }),
      });
      const data = await res.json()
      if (res.ok) {
        console.log(data);
        setError(null);
        setPreviousWater([...previousWater, formData]);
        setFormData({ waterAmount: 0 });
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteWater = async (waterId) => {
    try {
      const res = await fetch(`/api/water/delete-water/${waterId}/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json()
      if (res.ok) {
        setError(null);
        setPreviousWater(prevWater => prevWater.filter((water) => water._id !== waterId));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Add a useEffect to monitor changes in waterAmount and check for errors
  useEffect(() => {
    console.log(formData.waterAmount);
    if (formData.waterAmount < 0) {
      setError('Water amount is already 0 and cannot be further decremented...');
    } else if (formData.waterAmount >= 20) {
      setError('Water amount is at its maximum and cannot be further incremented');
    } else {
      setError(null); // Reset error if waterAmount is not negative
    }
  }, [formData.waterAmount]);
  
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex flex-col gap-5 pb-20 sm:items-center justify-center'>
        {/* Image */}
        <div className='ml-20'>
          <img 
            src={`https://img.freepik.com/premium-vector/glass-water-cartoon-illustration-fresh-healthy-water-vector-illustration_597063-177.jpg`}
            alt='glass-of-water'
            className="rounded-full w-48 h-48"
          />
        </div>
        <form onSubmit={handleSubmit}>
          {/* Plus-minus icons */}
          <div className='gap-5 ml-20 flex flex-row justify-evenly'>
            <svg 
              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="none" 
              viewBox="0 0 24 24"
              onClick={handleDeleteAmount}
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"/>
            </svg>
            {/* Display the water amount */}
            <div>
              <h1
                className='font-semibold text-2xl'
              >
                {formData.waterAmount && formData.waterAmount}
              </h1>
            </div>
            <svg 
              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="none" 
              viewBox="0 0 24 24"
              onClick={handleAddAmount}
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
            </svg>
          </div>
          <Button
            type='submit'
            gradientDuoTone='purpleToPink'
            className='ml-24 mt-5'
            outline
          >
              Save
          </Button>
        </form>
        <div className='ml-20'> 
          {error && (
            <Alert className='mt-5 w-200 h-100' color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
      {/* Previous Water Information */}
      <div className='w-80 h-100 ml-40 mb-20'>
        <Table>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>Water Amount</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
            {
              previousWater && previousWater.map((water) => (
                <Table.Body  key={water._id}>
                  <Table.Row>
                      <Table.Cell>{water.updatedAt && new Date(water.updatedAt).toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        {water.waterAmount}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                            className='font-medium text-red-500 hover:underline cursor-pointer'
                            onClick={() => {
                              handleDeleteWater(water._id);
                            }}
                          >
                            Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                </Table.Body>
              ))
            }
        </Table>
      </div>
    </div>
  )
}
