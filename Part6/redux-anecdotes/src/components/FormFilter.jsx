import { useSelector, useDispatch } from 'react-redux'
import { filterChange} from '../reducers/FilterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state)

    const handleChange = (event) => {
     dispatch(filterChange(event.target.value))
    
     console.log(filter)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter