import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h3>Add anecdote</h3>
            <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
            </form>
        </div>
    )   
}

export default AnecdoteForm
