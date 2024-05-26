import { Table, TableRow, Modal, Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { updateAmountOfBlog } from '../redux/user/userSlice';

export default function Blog() {
  // currentUser is needed to display their blogs.
  const { currentUser } = useSelector((state) => state.user);
  // A piece of state is created to store the blogs that come from the backend
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  // A state that initialises the blog id that's going to be deleted
  const [blogIdToDelete, setBlogIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // The following code uses a useEffect hook to
  // fetch the posts that were created in the backend
  // (for more information, see blogController.js)

  // It sets the query parameter to userId so that users can only see their posts
  // Then, the response is saved inside the data variable and shortly after that, data
  // is set to the blogs state, as mentioned earlier.

  // The dependency array is set to currentUser._id since the useEffect will only be called 
  // when the currentUser changes, which means we have to use their id to identify the currentUser. 

  useEffect(() => {
    const fetchBlogs = async () => {
      setError(null);
      try {
        const res = await fetch(`/api/blog/get-blogs?userId=${currentUser._id}`);
        const data = await res.json();
        
        if (res.ok) {
          setBlogs(data.blogs);
        } else{
          setError('Something went wrong. Please Try Again...');
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchBlogs();
  }, [currentUser._id]);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  const handleDeleteBlog = async () => {
    setError(null);
    setShowModal(false);
    try {
      const res = await fetch(`/api/blog/delete-blog/${blogIdToDelete}/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setBlogs((prevBlog) => prevBlog.filter((blog) => blog._id !== blogIdToDelete));
        dispatch(updateAmountOfBlog(currentUser.amountOfBlog - 1));
        console.log(updateAmountOfBlog());
      }
    } catch (error) {
        setError(error.message);
        console.log(error.message);      
    }
  }

  return (
    <div>
        {
          blogs.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Blog Image</Table.HeadCell>
                  <Table.HeadCell>Blog Title</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span className='hidden md:block'>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {blogs.map((blog) => (
                  <Table.Body key={blog._id}>
                    <TableRow>
                      <Table.Cell>{new Date(blog.updatedAt).toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/blog/${blog.slug}`}>
                          <img 
                            src={blog.image}
                            alt={blog.title}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link className='font-medium text-gray-900' to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                          onClick={() => {
                            setShowModal(true);
                            setBlogIdToDelete(blog._id);
                          }}
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/update-blog/${blog._id}`} className=' text-teal-500 hover:underline'>
                          Edit
                        </Link>
                      </Table.Cell>
                    </TableRow>
                  </Table.Body>
                ))}
              </Table>
            </>
          ) : (
            <div className='flex flex-col ml-40'>
              <div>
                <p className='text-3xl mt-5'>
                  Hmmm... Looks like you haven't created
                  any blogs
                </p>
              </div>
              <p className='my-20'>
                But no worries! You can still start your
                blogging joruney by 
                <Link to='/create-blog' className='text-blue-500 pl-1'>
                  clicking here
                </Link>
              </p>
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
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteBlog}>
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
