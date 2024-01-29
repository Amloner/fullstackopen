import { useState, useEffect } from 'react'
import phoneService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const error = {

      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    
  }


  return (
    <div style={error}>
      {message}
    </div>
  )
}

const RenderList = (props) => {

  const ToShow = (props.newSearch=='') ? props.persons : props.persons.filter(note => note.name.toLowerCase().includes(props.newSearch.toLowerCase()) === true)
  return (
    
   <ul>
     {ToShow.map(note => 
          <li key={note.id}>{note.name} {note.number}  <button onClick={() => {props.removePerson(note.id)}}>delete</button> </li>
        )}
   </ul>
 
 )
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
const PersonForm = (props) => {

  return (
    
    <form onSubmit={props.addNumber}>
    name: <input
        value={props.newName}
        onChange={props.handlePhoneChange}
      />
      <div>
      <div>number: <input    value={props.newNum}
        onChange={props.handleNumChange} /></div>

      <button type="submit">add</button>
      </div>
            </form> 
 )
}

const App = (props) => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setnewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPeople => {        setPersons(initialPeople)      })
  }, [])

  
  const removePerson = id => {
    const note = persons.find(n => n.id === id)

  if(confirm('Delete ' + note.name)){
    phoneService.remove(id).then(returnedNote => {
      setPersons(persons.map(note => note.id !== id ? note : returnedNote)

      )
      })
  
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })}
  }


  const addNumber = (event) => {
    event.preventDefault()


    const phoneObject = {
      name: newName,
      number: newNum,
    }
    const b =   persons.map(note =>note.name)  

   

    if((b.includes(phoneObject.name)) && confirm(phoneObject.name+'is already there, please confirm number change.'))
    {
      const findId = persons.find(n => n.name === newName).id
      const findPerson = persons.find(n => n.name === newName)
      console.log(findId)
      console.log(findPerson)

      console.log('Preexisting')
      const changedNote = { ...findPerson, number: newNum }

      phoneService
      .update(findId, changedNote).then(returnedNote => {
        setPersons(persons.map(note => note.id !== findId ? note : returnedNote))
      })

    }
    else {
      phoneService
      .create(phoneObject)
      .then(returnedNum => {        setPersons(persons.concat(returnedNum))    
        setErrorMessage(`Added '${phoneObject.name}' `        )    
            setTimeout(() => {          
              setErrorMessage(null)       
             }, 5000) 
         
      })
    setNewName('')
    setNewNum('')}
  }
 
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const Search = (event) => {
    console.log(event.target.value)
    setnewSearch(event.target.value)
  }
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter Search={Search} newSearch={newSearch} ></Filter>
      <h3>Add a new number</h3>
        <PersonForm addNumber={addNumber} newName={newName} handlePhoneChange={handlePhoneChange} newNum={newNum}
        handleNumChange={handleNumChange}></PersonForm>
      <div>
        <h3>Numbers</h3>
      
         <RenderList persons={persons} newSearch={newSearch} removePerson={removePerson}> </RenderList>
      </div>
     
    </div>
  )
}

export default App