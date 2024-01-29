import { useSelector, useDispatch } from 'react-redux'
import { voteThis} from '../reducers/anecdoteReducer'
import { setNotifcation, alert1Notifaction} from '../reducers/notificationReducer'
import { useAddUpdatepostMutation } from '../services/annecTest'



function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export const AnnecdoteList= () => {
    // but not the result in `ComponentTwo`, and vice-versa
    const [updatePost, result] = useAddUpdatepostMutation()
  const filter = useSelector(state => state.filter)
 
 
  const anecdotes = useSelector(state => state.annecdotes.filter(notes => notes.content.includes(filter)).sort((a, b) => b.votes - a.votes))

  const dispatch = useDispatch()
  
  
  const vote = async (anecdote) => {
    const id = anecdote.id
    updatePost(anecdote)
    dispatch(voteThis(id))
    dispatch(alert1Notifaction('You voted ' + anecdote.content,5000))
    

  }
  
 return(
 <> {anecdotes.map(anecdote =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </div>
)}
      </>
 )
}

export default AnnecdoteList