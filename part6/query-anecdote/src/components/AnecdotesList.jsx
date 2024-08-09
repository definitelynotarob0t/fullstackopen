import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests' 
import VoteButton from "./VoteButton"

const AnecdotesList = () => {

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
      })
    console.log(JSON.parse(JSON.stringify(result)))
    
    if ( result.isLoading ) {
    return <div>loading data...</div>
    } else if (result.isError) {
    return <div>Anecdote service unavailable due to problem connecting with server</div>
    }
    
    const anecdotes = result.data

    return (
        <>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                < VoteButton anecdote={anecdote}/>
              </div>
            </div>
            )}
        </>
    )
}

export default AnecdotesList