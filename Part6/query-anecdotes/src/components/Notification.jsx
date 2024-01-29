import { useContext } from 'react'
import CounterContext from '../App'


const Notification = () => {
  const [counter, dispatch] = useContext(CounterContext)
  console.log(counter)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (true) return null

  return (
    <div style={style}>
      
    </div>
  )
}

export default Notification
