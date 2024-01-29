import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { createContext } from 'react'

const CounterContext = createContext()

const delay = t => new Promise(resolve => setTimeout(resolve, t));

const counterReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "RESET":
        return ''
    default:
        return state
  }
}    


const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  const updateNote = updatedNote =>
  axios.put(`${'http://localhost:3001/anecdotes'}/${updatedNote.id}`, updatedNote).then(res => res.data)

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })


  const result = useQuery({    queryKey: ['notes'],   
   queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),    retry: false}
   )
    
    if ( result.isError ) {    return <div>Error</div>  }

  if ( result.isLoading ) {    return <div>loading data...</div>  }

  const blink = (anecdote) => {
    counterDispatch({
      type: 'SET',
      payload: anecdote})
      delay(3000).then(() => 
      counterDispatch({
              type: 'RESET'}));
      
      
     
        
  }


  console.log(JSON.parse(JSON.stringify(updateNoteMutation)))
const toggleImportance = (note) => {    updateNoteMutation.mutate({...note, votes: note.votes+1 })  }

  const handleVote = (anecdote) => {
    toggleImportance(anecdote)
    console.log('vote')
    blink('a')
  }
  const anecdotes = result.data
console.log(counter)
  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
    <div>
      <h3>Anecdote app</h3>
      <>{counter}</>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </CounterContext.Provider>
  )
}

export default App
