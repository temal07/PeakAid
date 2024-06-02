import { Table, Modal, Button } from 'flowbite-react';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ViewAllFood() {
  const [error, setError] = useState(null);
  const [foods, setFoods] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [foodIdToDelete, setFoodIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Sets any possible previous errors to 0
    setError(null);
    const fetchFoodInfo = async () => {
      const res = await fetch(`/api/food/get-food?userId=${currentUser._id}`);
      const data = await res.json();

      if (res.ok) {
        setFoods(data.foods);
        console.log(data);
        setError(null);
      } else {
        setError(data.message);
      }
    } 

    fetchFoodInfo();
  }, [currentUser._id]);

  const handleDeleteFood =  async () => {
    try {
      const res = await fetch(`/api/food/delete-food/${foodIdToDelete}/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();

      if (res.ok) {
        setFoods((prevFood) => prevFood.filter((food) => food._id !== foodIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  }

  return (
    <div>    
      {
        foods.length > 0 ? (
          <Table hoverable className='shadow-md mb-10'>
            <Table.Head>
              <Table.HeadCell>Updated At</Table.HeadCell>
              <Table.HeadCell>Food Name</Table.HeadCell>
              <Table.HeadCell>Food Calories</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className='hidden md:block'>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
              foods.map((food) => (
                <Table.Body key={food._id}>
                    <Table.Row>
                      <Table.Cell>{new Date(food.updatedAt).toLocaleString()}</Table.Cell>
                      <Table.Cell>{food.food.name}</Table.Cell>
                      <Table.Cell>{food.food.calories}</Table.Cell>
                      <Table.Cell><span
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModal(true);
                            setFoodIdToDelete(food._id);
                          }}
                        >
                          Delete
                        </span></Table.Cell>
                      <Table.Cell>
                        <Link to={`/nutritions/update-food/${food._id}`} className=' text-teal-500 hover:underline'>
                          Edit
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
        ) : (
          <div className='ml-20 p-20'>
            <h1>Looks like you don't have any food info!</h1>
            <Link to={`/nutritions/food/${currentUser._id}`} className='text-blue-500'>
              Add Food Info!
            </Link>
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
              Are you sure you want to delete this food?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteFood}>
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
