import React, {useState, useEffect} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextInput, Select, Button } from 'flowbite-react';

export default function UpdateActivity() {
    // Add necessary states: 
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const { activityId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchActivities = async () => {
                setError(null);
                const res = await fetch(`/api/activity/get-activity?userId=${currentUser._id}`);
                const data = await res.json();
        
                if (res.ok) {
                    setError(null);
                    console.log(data);
                    setFormData(data.activities[0].activity);
                } else {
                setError(true);
                console.log(data.message);
                }
            }
            fetchActivities();
          } catch (error) {
            setError(true);
            console.log(error);        
          }
    
      }, [currentUser._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        try {
            const res = await fetch(`/api/activity/update-activity/${activityId}/${currentUser._id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setError(null);
                console.log(data);
                navigate(`/view-all-activities/${currentUser._id}`);
            } else {
                setError(true);
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);         
        }
    }

  return (
    <div className='flex flex-col mx-20 my-20'>
        <div className='mx-20 mb-10'>
            <h1 className='flex justify-center text-4xl md:text-6xl bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text font-semibold'>
                Update Exercise Information
            </h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
            <TextInput 
                type='text'
                placeholder='Name:'
                required
                id='name'
                className='flex-1'
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                value={formData.name}
            /> 
            <TextInput 
                type='text'
                placeholder='Calories Burnt:'
                required
                id='caloriesBurnt'
                className='flex-1'
                onChange={(e) => setFormData({...formData, caloriesBurnt: e.target.value})}
                value={formData.caloriesBurnt}
            />
            <Select
                onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
                }
                value={formData.category}
            >
                <option value='uncatgeorised'>Select The Type</option>
                <option value='strength'>Strength Training</option>
                <option value="aerobic">Aerobic</option>
                <option value="swimming">Swimming</option>
                <option value="running">Running/Jogging</option>
                <option value="hiking">Hiking/Walking</option>
                <option value="pushup">Pushup</option>
                <option value="yoga">Yoga</option>
                <option value="meditation">Meditation</option>
                <option value="stretching">Stretching</option>
            </Select>
            <Button 
                type='submit'
                gradientDuoTone='purpleToBlue'
            >
                Update Exercise
            </Button>
            </div>
        </form>
        <div className='flex justify-center mt-10'>
            <Link to={`/view-all-activities/${currentUser._id}`} className='text-blue-500'>
                See Your activity Info:
            </Link>
        </div>
    </div>
  )
}
