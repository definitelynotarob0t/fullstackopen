import { useDispatch, useSelector } from 'react-redux'
import { incrementVote, remove } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      return state.anecdotes.filter(anecdote => 
      state.filter
      ? anecdote.content.includes(state.filter)
      : state.anecdotes)
    })

    const handleLike = (anecdote) => {
      dispatch(incrementVote(anecdote))
      dispatch(notify(anecdote.content, 5))
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleLike(anecdote)}>vote</button>
            <button onClick={() => dispatch(remove(anecdote))}>delete</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList
