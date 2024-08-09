import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers : {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    removeAnecdote(state, action) {
      const anecdoteToDelete = action.payload.id
      return state.map(anecdote => 
        anecdote.id !== anecdoteToDelete.id ? anecdote : null)
        .sort((a,b) => b.votes - a.votes)
    }

  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote, removeAnecdote } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.likeAnecdote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const remove = anecdote => {
  return async dispatch => {
    const anecdoteDeleted = await anecdoteService.deleteAnecdote(anecdote)
    dispatch(removeAnecdote(anecdoteDeleted))
  }
}

export default anecdoteSlice.reducer
