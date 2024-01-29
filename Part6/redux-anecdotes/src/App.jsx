import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/FormFilter'
import Notifiaction from './components/Notification'
import { useDispatch } from 'react-redux'
import {setAnnec} from './reducers/anecdoteReducer'
import annecService from './services/annec'
import { initializeAnnec } from './reducers/anecdoteReducer'
import { useAddNewPostMutation } from './services/annecTest'
import {alert1Notifaction, setNotifcation } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch() 
  useEffect(() => {
    dispatch(initializeAnnec()) 
    
  
  }, [dispatch]) 

  
useAddNewPostMutation( 1, {1 : 1})
  return (
    <div>
      <Notifiaction />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App