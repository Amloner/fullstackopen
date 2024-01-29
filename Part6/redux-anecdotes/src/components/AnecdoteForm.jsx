import {useDispatch } from 'react-redux'
import { createAnnec} from '../reducers/anecdoteReducer'
import annecService from '../services/annec'
import { useAddNewPostMutation } from '../services/annecTest'



export const AnnecdoteForm= () => {
  const dispatch = useDispatch()
  const [createAlbum, { isLoading }] = useAddNewPostMutation();
  const addAnnec = async (event) =>
  {
    event.preventDefault()   
     const content = event.target.annec.value
     event.target.annec.value = ''
     const newNote = await annecService.createNew(content)
     console.log(newNote)
     createAlbum(newNote)
    }


 return(
 <> <h2>create new</h2>
      <form onSubmit={addAnnec}>
        <div><input name="annec"/></div>
        <button type="submit">create</button>
      </form>
      </>
 )
}

export default AnnecdoteForm