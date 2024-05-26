import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

export default function SingleBlog() {
  // use UseParams to get the slug in the url
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState(null);

  // This useEffect fetches the individual blog that was requested on
  // blogs/:userId

  useEffect(() => {
    const fetchBlog = async () => {
      setError(null);
      setLoading(true);

      // fetch an individual blog by looking at its slug. The slug
      // comes from useParams() which finds the param and sets it to blogSlug
      try {
        const res = await fetch(`/api/blog/get-blogs?slug=${blogSlug}`);
        const data = await res.json();

        if (res.ok) {
          // if the response is ok, set the blog to the first
          // index of the data (the data that comes back is an array)          
          setBlog(data.blogs[0]);
          setLoading(false);
          setError(false);
        } else {
          setError(true);
          setLoading(false);
          return;
        }

      } catch (error) {
          setError(true);
          setLoading(false);        
      }    
    }

    fetchBlog();
  }, [blogSlug]);

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  // this useEffect fetches the recent blogs 

  // it uses the limit query defined on the server-side
  // to serve only 4 blogs along with the main blog (the one 
  // the user is reading)

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/get-blogs?limit=4`);
        const data = await res.json();

        if (res.ok) { 
          // Filter out the blog that the user is currently reading
          const filteredBlogs = data.blogs.filter((item) => item._id !== blog._id);
          // Take the second index from the filtered array
          const secondBlog = filteredBlogs[1];
          // Set the recentBlogs state to the filtered array
          setRecentBlogs(filteredBlogs);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
      }
    }

    fetchRecentBlogs();
  });

  return (
    <div className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {blog && blog.title}
      </h1>
      <img 
        src={blog && blog.image}
        alt={blog && blog.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
          <span>{blog && new Date(blog.createdAt).toLocaleString()}</span>
          <span>By {blog && blog.userId}</span>
      </div>
      <div 
        className='p-3 max-w-2xl mx-auto w-full blog-content'
        dangerouslySetInnerHTML={{__html: blog && blog.content}}
      >
       {/* Sets the html because the content comes in as an HTML code */} 
      </div>
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='tex-xl mt-5'>Recent Articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {
            recentBlogs && recentBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          }
        </div>
      </div>  
    </div>
  )
}
