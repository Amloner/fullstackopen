import { useState, useEffect } from 'react'
import axios from 'axios'

const RenderList = (props) => {

  const Display = (props) => {
    const count = props.count
   console.log('hi')
    return (
     <div>
         <h3>{count.name.common}</h3>
         <h5>Capital {count.capital}</h5>
         <h5>Area {count.area}</h5>
         {console.log(count.languages)}
         <ul>
           
             
           <></>
   
           
           </ul>      
           <img src={count.flags.png} alt="My Image" />
      </div>
   
    )
   }
  const ToShow = (props.newSearch=='') ? props.persons : props.persons.filter(note => note.name.common.toLowerCase().startsWith(props.newSearch.toLowerCase()  ) === true)
  console.log(ToShow.length)


  
  if ((ToShow.length) > 10 || typeof ToShow.length == 'undefined')
  {
    return (
      <h3>Make it more specifics</h3>


    )
  }
  else if ((ToShow.length) > 1 ){
    return (
    
      <ul>
      
        {ToShow.map(note => 
             <li key={note.area}>{note.name.common}  <button>delete</button> </li>
           )}
      </ul>)
     

  }
  else {

  return (  <Display count= {ToShow[0]}></Display>
  )
  }
    
    }

const Filter = (props) => {

  return (
    
    <form>
    filter shown with <input
        value={props.newSearch}
        onChange={props.Search}
      />
    </form> 
 )
}

const removePerson = id => {
  const note = persons.find(n => n.name === name)

}


const App = () => {
  
  const [newSearch, setnewSearch] = useState('')
  const [rates, setRates] = useState({})
  
  const Search = (event) => {
    setnewSearch(event.target.value)
  }
  useEffect(() => {
   
    // skip if currency is not defined
   
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setRates(response.data)
        })
       
  }, [])

  return (
    <div>
      <h2>Countries</h2>
      <Filter Search={Search} newSearch={newSearch} ></Filter>

      <RenderList persons={rates} newSearch={newSearch}> </RenderList>

    </div>
  )
}

export default App