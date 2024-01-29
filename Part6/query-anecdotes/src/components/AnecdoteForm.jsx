import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
const AnecdoteForm = () => {
  const createNote = newNote =>  axios.post('http://localhost:3001/anecdotes', newNote).then(res => res.data)

  const newNoteMutation = useMutation({ mutationFn: createNote,
    onSuccess: () => {      queryClient.invalidateQueries({ queryKey: ['notes'] })    }, })
    
 
 
    const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate({ content, votes:0  }

      )
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
