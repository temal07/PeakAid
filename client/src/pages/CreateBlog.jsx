import React, { useState } from 'react'
import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAmountOfBlog } from '../redux/user/userSlice.js';

export default function CreateBlog() {
  // create a state for keeping track of the uploaded file
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Make sure before you upload the image using the handleUploadImage
  // function, you follow the following steps: 
  // 1. Go to Firebase
  // 2. Go to your project (if you don't have any, create one)
  // 3. Go to Build (on the left side, there is a dropdown called Build)
  // 4. Click on storage
  // 5. Click on Get Started
  // 6. Follow the steps
  // 7. On the storage page, go to rules (the navbar)
  // 8. Add the following code: 
  /*
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read;
          allow write: if request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.matches('image/.*');
        }
      }
    }
  */
  // 9. Click on Publish (or similar to that)
  // 10. Done

  // If you don't follow these steps, you'll get an error that is a CORS policy error.

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            console.log(formData);
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res  = await fetch('/api/blog/create-blog', {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        dispatch(updateAmountOfBlog(currentUser.amountOfBlog + 1));
        navigate(`/blogs/${currentUser._id}`);
      }
    } catch (error) {
      setPublishError('Something went wrong. Please Try again...');      
    }
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Create your Blog</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Title */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            placeholder='Title:'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        {/* Image Upload */}
        <div className='flex gap-4 items-center justify-between border-4
         border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {
                imageUploadProgress ? (
                  <div className='w-16 h-16'>
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                  </div>
                )
               : (
                  'Upload Image'
               )
              }
            </Button>
        </div>
        {
          imageUploadError && (
            <Alert color='failure'>
              {imageUploadError}
            </Alert>
          )
        }
        {
          formData.image && (
            <img 
              src={formData.image}
              alt='upload'
              className='w-full h-72 object-cover'
            />
          )
        }
        {/* Text Input from React Quill */}
        <ReactQuill theme='snow' placeholder='Write Something...' onChange={(value) => {setFormData({...formData, content: value})}} required className='h-72 mb-20'/>
        <Button type='submit' gradientDuoTone="purpleToPink">
            Publish
        </Button>
        {
          publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
        }
      </form>
    </div>
  )
}
