import { useState } from 'react'

const NextButton = ({handleClick}) => {
  return (
    <button onClick={handleClick}>next anecdote</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const initialPoints = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(initialPoints)
  const [selected, setSelected] = useState(0)

  const handleVoteClick = () => {
    const newPoints = [ ...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  let currentMax = 0
  let winner = ""
  for (let i = 0; i < points.length; i++) {
    if (points[i] > currentMax) {
      winner = anecdotes[i]
      currentMax = points[i]
    }
  }

  const random = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    if (number == selected) {
      number = Math.floor(Math.random() * anecdotes.length)
    } // regenerating random number if the number was the same as selected, to discourage selection of the same anecdote
    return (
      number
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br></br>
      <>has {points[selected]} votes</> <br></br>
      <button onClick={handleVoteClick}>vote</button>
      <NextButton handleClick={()=> setSelected(random)}></NextButton>
      <h2>Anecdote with the most votes</h2>
      <>{winner}</> <br></br>
      <>has {currentMax} votes</>
    </div>
  )
}

export default App