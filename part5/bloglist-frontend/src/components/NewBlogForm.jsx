import blogService from '../services/blogs'
import { useState } from 'react'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url
      })
      props.setUpdateTrigger(!props.updateTrigger)

      props.setBlogs([...props.blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setErrorMessage(`New blog created: ${title}`)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
      props.toggleVisibility() // Closes new blog form after creation

    } catch (error) {
      console.error('Error creating blog:', error)
      props.setErrorMessage('Invalid blog')
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleBlogCreation} className="newBlogForm">
        <h2>Add new blog</h2>
        <p>
            title: <input data-testid="title-input" value={title} onChange={({ target }) => setTitle(target.value)} />
        </p>
        <p>
            author: <input data-testid="author-input" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </p>
        <p>
            url: <input data-testid="url-input" value={url} onChange={({ target }) => setUrl(target.value)} />
        </p>
        <div>
          <button data-testid="add-button" type="submit" onClick={handleBlogCreation}>add</button>
        </div>
      </form>
    </>
  )
}

export default NewBlogForm