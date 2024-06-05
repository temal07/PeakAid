import { Button, Modal, Table } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

export default function ViewAllActivities() {
  const [showModal, setShowModal] = useState(false);
  const [activityIdToDelete, setActivityIdToDelete] = useState('');
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      setError(null);
      try {
        const res = await fetch(`/api/activity/get-activity?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setError(null);
          console.log(data);
          setActivities(data.activities);
        } else {
          setError(true);
          console.log(data.message);
        }
      } catch (error) {
        setError(true);
        console.log(error);        
      }
    }

    fetchActivities();
  }, [currentUser._id]);

  const handleDeleteActivity = async () => {
    setError(null);
    try {
      const res = await fetch(`/api/activity/delete-activity/${activityIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(false);
        setError(false);
        console.log(data);
        setActivities((prevActivity) => prevActivity.filter((activity) => activity._id !== activityIdToDelete));
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className='mt-10'>
      {
       activities.length > 0 ? (
          <>
          <div className='flex mt-10 justify-center'>
            <h2 className='text-3xl'>Here are all of the activities of {currentUser.username}</h2>
          </div>
          <Table hoverable className='shadow-md my-10'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Activity Name</Table.HeadCell>
              <Table.HeadCell>Burnt Calories</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className='hidden md:block'>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {activities.map((activity) => (
              <Table.Body key={activity._id}>
                <Table.Row>
                  <Table.Cell>{new Date(activity.updatedAt).toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    {activity.activity.name}
                  </Table.Cell>
                  <Table.Cell>
                    {activity.activity.caloriesBurnt}
                  </Table.Cell>
                  <Table.Cell>
                    {activity.activity.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true);
                        setActivityIdToDelete(activity._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-activity/${activity._id}`} className=' text-teal-500 hover:underline'>
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
       ) : (
        <div>
          <div className="mt-10 ml-20">
              <h1>No activities added!</h1>
          </div>
        </div>
       )
      }
      
      <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
          >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this activity?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteActivity}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
    
  )
}
