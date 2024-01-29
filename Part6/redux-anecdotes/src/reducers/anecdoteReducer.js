import annecService from '../services/annec'
import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)




const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


export const initializeAnnec = () => {  return async dispatch => {   
   const notes = await annecService.getAll()    


   
   dispatch(setAnnec(notes))  }}



   export const createAnnecd = content => {  return async dispatch => {    
    const newNote = await annecService.createNew(content)
        dispatch(appendAnnec(newNote))  }}

const AnnecSlice = createSlice({
  name: 'annecdotes',
  initialState : [],
  reducers: {
    voteThis(state, action) {
      const id = action.payload
      
      const annecdoteToChange = state.find(n => n.id === id)
      const changedAnnecdote = { 
        ...annecdoteToChange, 
        votes: annecdoteToChange.votes+1 
      }
      
      return state.map(note =>
        note.id !== id ? note : changedAnnecdote 
      )
    },
    createAnnec(state, action) {
     

      return state.concat((action.payload))
    },
    appendAnnec(state, action) {    
        state.push(action.payload)    }
        ,
  setAnnec(state, action) { 
     
    return action.payload    }
   
  }
})

export const { voteThis, createAnnec , appendAnnec , setAnnec} = AnnecSlice.actions
export default AnnecSlice.reducer