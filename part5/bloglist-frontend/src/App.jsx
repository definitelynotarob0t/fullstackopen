import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import PropTypes from 'prop-types'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [updateTrigger, setUpdateTrigger] = useState(false) // State to trigger re-fetching blogs

  const newBlogFormRef = useRef() // useRef() returns a ref object with a single property, current, initially set to undefine

  //fetch all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [updateTrigger])

  //store logged-in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('user:', user)

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <>
      {blogs
        .sort((a,b) => b.likes - a.likes) // Blogs sorted according to number of likes
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateTrigger={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}/>
        )}
    </>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogForm()
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      {user === null ?
        <div>
          <h1>Log-in to application</h1>
          <Notification message={errorMessage} />
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
        password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage} />
          <p>
            <i>{user.name} logged-in </i>
            <button onClick={handleLogout}>logout </button>
          </p>
          {blogForm()}
          <Togglable buttonLabel="Add blog" ref={newBlogFormRef}>
            <NewBlogForm
              user={user}
              setUser={setUser}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              blogs={blogs}
              setBlogs={setBlogs}
              toggleVisibility={() => newBlogFormRef.current.toggleVisibility()}
              updateTrigger={updateTrigger}
              setUpdateTrigger={setUpdateTrigger}
            />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App