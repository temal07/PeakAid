import { Alert, Button, Table, TableHead } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Water() {
  // sets necessary states: waterAmount will store the water amount in 
  // the frontend

  // A form data for sending the water amount to the backend
  const [waterData, setWaterData] = useState([]);
  // State for most recent water id
  const [waterId, setWaterId] = useState(null);
  // Sets the previous water amounts
  const [previousWater, setPreviousWater] = useState([]);
  // Gets the current user's info
  const { currentUser } = useSelector((state) => state.user);  
  // Any possible errors will be displayed in the client side, too.
  const [error, setError] = useState(null);

  // Fetches the water amount
  useEffect(() => {
    const fetchWaterAmount = async () => {
      try {
        // A GET request is sent to the backend (server) 
        const res = await fetch(`/api/water/get-water?userId=${currentUser._id}`);
        // JSONifies the data
        const data = await res.json();
        // If the response comes back successfully, logs and sets (to the state) the data;
        if (res.ok) {
          console.log(data);
          if (data.waterAmounts && data.waterAmounts.length > 0) {
            setWaterData(data.waterAmounts[0]);
            setPreviousWater(data.waterAmounts.slice(1));
            // I set the index to 0 because 
            // users will update their most recent water amount
            setWaterId(data.waterAmounts[0]._id);
          } 
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchWaterAmount();
  }, [currentUser._id, waterData.waterAmount]);

  // Both handleDeleteAmount and handleAddAmount 
  // will be asynchronous because they will update 
  // the water amount in the backend

  // These functions are updating the most recent water information (the 
  //  most up-to-date)
  const handleAddAmount = async () => {
    const increment = 1;
    // Sends a POST request to the backend
    if (waterData.waterAmount + increment > waterData.maximumAmount) {
      setError('Water amount is at its maximum and cannot be further incremented');
      return;
    }

    try {
      const res = await fetch(`/api/water/add-water-amount/${waterId}/${currentUser._id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({waterAmount: increment}),
      });
      const data = await res.json();
      
      // Logs the data if the response is OK.
      if (res.ok) {
        console.log(data);
        setWaterData((prevData) => ({ ...prevData, waterAmount: prevData.waterAmount + increment }));
      }
    } catch (error) {
      console.log(error);      
    }
  }

  const handleDeleteAmount = async () => {
    const decrement = 1;
    if (waterData.waterAmount - decrement < 0) {
      setError('Water amount is at its minimum and cannot be further decremented');
      return;
    }
    try {
      const res = await fetch(`/api/water/delete-water-amount/${waterId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ waterAmount : decrement }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        console.log(waterId);
        setWaterData((prevData) => ({ ...prevData, waterAmount: prevData.waterAmount - decrement }));
      } else {
        console.log('There was an error during the fetching process. Please try again');
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

  // Add a handleSubmit function for sending the recent water info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (waterData.waterAmount > 20) {
      setError('Water amount must not exceed 20');
      return;
    }

    try {
      const res = await fetch(`/api/water/add-water/${currentUser._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ waterAmount: waterData.waterAmount }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setError(null);
        setPreviousWater([...previousWater, data]);
        console.log("waterData after update:", waterData);
        setWaterData({ waterAmount: 0, maximumAmount: 20 });
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
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
              className={`w-6 h-6 text-gray-800 dark:text-white cursor-pointer ${waterData.waterAmount <= 0 ? 'pointer-events-none opacity-50' : ''}`} 
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
                {waterData?.waterAmount}
              </h1>
            </div>
            <svg 
              className={`w-6 h-6 text-gray-800 dark:text-white cursor-pointer ${waterData.waterAmount >= 20 ? 'pointer-events-none opacity-50' : ''}`}
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
      {
        waterData ? (
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
        ) : (
          <div className='ml-20 p-20'>
            <h1>Looks like you don't have any water info!</h1>
            <Link to={`/nutritions/water/${currentUser._id}`} className='text-blue-500'>
              Add Water Info!
            </Link>
          </div> 
        )
      }
    </div>
  )
}
