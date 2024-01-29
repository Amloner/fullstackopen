import { createSlice } from '@reduxjs/toolkit'
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}




  export const alert1Notifaction = (content,time) => {  return async dispatch => {    
    dispatch(setNotifcation(content))
    console.log(content)
    await timeout(time)
    dispatch(setNotifcation('')) }}


const notificationSlice = createSlice({
  name: 'notificatio1n',
  initialState: '',
  reducers: {
    setNotifcation(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { setNotifcation } = notificationSlice.actions
export default notificationSlice.reducer