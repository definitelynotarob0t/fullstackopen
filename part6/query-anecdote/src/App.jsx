import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdotesList from './components/AnecdotesList'

const App = () => {

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdotesList /> 
      <AnecdoteForm />
    </div>
  )
}

export default App
