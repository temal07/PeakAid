import React from 'react'
import { Button, FileInput, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateBlog() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Create your Blog</h1>
      <form className='flex flex-col gap-4'>
        {/* Title */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            placeholder='Title:'
            required
            id='title'
            className='flex-1'
          />
        </div>
        {/* Image Upload */}
        <div className='flex gap-4 items-center justify-between border-4
         border-teal-500 border-dotted p-3'>
            <FileInput
              type='file'
              accept='image/*'
              />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
            >
              Upload Image
            </Button>
        </div>
        {/* Text Input from React Quill */}
        <ReactQuill theme='snow' placeholder='Write Something...' required className='h-72 mb-20'/>
        <Button type='submit' gradientDuoTone="purpleToPink">
            Publish
        </Button>
      </form>
    </div>
  )
}
