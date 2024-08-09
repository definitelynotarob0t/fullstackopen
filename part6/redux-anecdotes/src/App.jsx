import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { initialiseAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseAnecdotes()) 
  }, []) 

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter /> 
      < AnecdoteList />
      < AnecdoteForm />
    </div>
  )
}

export default App