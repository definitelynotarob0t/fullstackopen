import { useNotificationDispatch } from '../../NotificationContext'  
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from '../requests'

const VoteButton = ( { anecdote }) => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    const incrementVoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
          queryClient.invalidateQueries(['anecdotes'])
        }
      })

    const handleVote = () => {
        incrementVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        dispatch({ type: 'VOTE', payload: anecdote })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
          }, 5000) 
    }

    return (
        <button onClick={handleVote}>
            vote
        </button>
    )
}

export default VoteButton
