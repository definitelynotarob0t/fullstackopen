import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, updateTrigger, setUpdateTrigger }) => {
  const [visible, setVisible] = useState(false) // Initially, details aren't visible
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' } // display property set to 'none' hides element...  display property set to '' shows element
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleClick = async () => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      likes: likes + 1,
    })

    setLikes(updatedBlog.likes)
  }

  const confirmDelete = async () => {
    console.log('blog:', blog)

    if (window.confirm(`Remove "${blog.title}"?`)) {
      await blogService.deleteBlog(blog)
      setUpdateTrigger(!updateTrigger) // Toggle the state to trigger re-fetching blogs
    }
  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} -- by {blog.author}    <button onClick={toggleVisibility}> view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} -- by {blog.author}   <button onClick={toggleVisibility}> hide</button></div>
        <div>{blog.url}</div>
        <div>likes: {likes}  <button onClick = {handleClick}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.name === user.name && (
          <button onClick={confirmDelete}>remove</button>
        )}
      </div>
    </div>

  )}

export default Blog