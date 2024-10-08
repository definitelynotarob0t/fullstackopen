import { useState } from 'react'
import {
  Routes, 
  Route, 
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'
import { useField, clearFields } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification && (
      <div>
        <p>{notification}</p>
      </div>
    )}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>
          {anecdote.content}
        </Link>
        </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote, setNotification }) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p> has {anecdote.votes} votes </p>
      <p> for more info, see <Link to={anecdote.info}>{anecdote.info}</Link>  </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ anecdotes, setAnecdotes, setNotification }) => {
  const content = useField()
  const author = useField()
  const info = useField()

  const navigate = useNavigate()

  const addNew = ( newAnecdote ) => {
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: Math.round(Math.random() * 10000)
    }
    addNew(newAnecdote)
    setNotification(`New anecdote "${content.value}" added!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }


  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form >
        content: 
        <input {...content} />
        <br/>
        author: 
        <input {...author} />
        <br/>
        url for more info: 
        <input {...info} />
        <br/>
        <button onClick={handleSubmit}>create</button>
        <button onClick={clearFields}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" 
        element={<AnecdoteList anecdotes={anecdotes} notification={notification}/>} 
        />
        <Route path="/create" 
            element={ <CreateNew
              anecdotes={anecdotes}
              setAnecdotes={setAnecdotes} 
              setNotification={setNotification}
            />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
