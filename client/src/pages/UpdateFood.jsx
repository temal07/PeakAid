import React, {useState, useEffect} from 'react'
import { TextInput, Button } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateFood() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const { foodId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchFoodInfo = async () => {
                const res = await fetch(`/api/food/get-food?foodId=${foodId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setError(data.message);
                    return;
                }
                if (res.ok) {
                    setError(null);
                    console.log(data);
                    setFormData(data.foods[0].food);
                }
            }
            fetchFoodInfo();
            } catch (error) {
                console.log(error);
            }

    }, [foodId]);

    useEffect(() => {
        console.log(formData.name, formData.calories);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        try {
            const res = await fetch(`/api/food/update-food/${foodId}/${currentUser._id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            }); 
            const data = await res.json();

            if (res.ok) {
                setError(null);
                navigate(`/nutritions/view-all-food/${currentUser._id}`);
            } else {
                setError(data.message);
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='flex flex-col gap-5'>
        {/* Form */}
        <div className='ml-20'> 
        <div className='flex justify-center'>
            <h1 className='text-3xl mb-5'>Update your Food Information Here:</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-20'>
            <TextInput
                type='text'
                placeholder='Food Name:'
                required
                id='name'
                className='flex-1'
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                value={formData.name}
            /> 
            <TextInput
                type='text'
                placeholder='Calories:'
                required
                id='calories'
                className='flex-1'
                onChange={(e) => setFormData({...formData, calories: e.target.value})}
                value={formData.calories}
            />
            <Button 
                gradientDuoTone='purpleToPink'
                className='flex-1'
                type='submit'
            >
            Update Food
            </Button>
        </form>
        </div>
        <div className='flex justify-center mb-10'>
            <Link className='text-blue-500' to={`/nutritions/view-all-food/${currentUser._id}`}>
            See Your food Info:        
            </Link>
        </div>
    </div>
  )
}
