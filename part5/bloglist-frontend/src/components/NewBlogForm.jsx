import blogService from '../services/blogs'


const NewBlogForm = (props) => {
  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({
        title: props.title,
        author: props.author,
        url: props.url
      })
      props.setUpdateTrigger(!props.updateTrigger)

      props.setBlogs([...props.blogs, newBlog])
      props.setTitle('')
      props.setAuthor('')
      props.setUrl('')
      props.setErrorMessage(`New blog created: ${props.title}`)
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
      <form onSubmit={handleBlogCreation}>
        <h2>Add new blog</h2>
        <p>
            title: <input value={props.title} onChange={({ target }) => props.setTitle(target.value)} />
        </p>
        <p>
            author: <input value={props.author} onChange={({ target }) => props.setAuthor(target.value)} />
        </p>
        <p>
            url: <input value={props.url} onChange={({ target }) => props.setUrl(target.value)} />
        </p>
        <div>
          <button type="submit" onClick={handleBlogCreation}>add</button>
        </div>
      </form>
    </>
  )
}

export default NewBlogForm