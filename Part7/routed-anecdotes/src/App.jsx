import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import  { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes, Route, Link,   useParams ,   useNavigate
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >  <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Note = ({ anecdotes }) => {
  const id = useParams().id 
  const note = anecdotes.find(n => n.id === Number(id)) 
  console.log(id)
  console.log(note)

  return (
    <div>
      <h2>{note.content} by {note.author}</h2>
      <p>has {note.votes} votes</p>

    <p>for more info see <a href={note.info}>{note.info}</a> </p>      

    </div>
  )
}


const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const contenth = useField('text')
  const authorh = useField('text')
  const infoh = useField('text')

  const navigate = useNavigate()
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleClear =  (e) => {
    
    contenth.clear()

    authorh.clear()

    infoh.clear()
  }

  const handleSubmit =  (e) => {
    
    const content = contenth.value
    const author = authorh.value
    const info = infoh.value

    e.preventDefault()
    
  props.addNew({
    content,
      author,
      info,
      votes: 0
    }
   
   
    )
    
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
          type={contenth.type}
          value={contenth.value}
          onChange={contenth.onChange} 
        /> 
        </div>
        <div>
          author
          <input 
          type={authorh.type}
          value={authorh.value}
          onChange={authorh.onChange} 
        />     </div>
        <div>
          url for more info
          <input 
          type={infoh.type}
          value={infoh.value}
          onChange={infoh.onChange} 
        />   </div>
        <button>create</button>

      </form>
      
      <button onClick={handleClear}>reset</button>
    </div>
  )

}

const App = () => {
  const [page, setPage] = useState('home')

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const delay = t => new Promise(resolve => setTimeout(resolve, t))



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

  setNotification('A new annecdote ' + anecdote.content + ' created!')
  delay(3000).then(() =>   setNotification(''));


  
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  console.log(anecdotes)

  return (
    <Router>
    <div>
    <h1>Software anecdotes</h1>
      <Link to="/">anecdotes  </Link>

      <Link to="/createnew">create new  </Link>
      <Link  to="/about">about  </Link>
    </div>
    <div>
      <p>{notification}</p>
    </div>

    <Routes>
      <Route path="/createnew" element={ <CreateNew addNew={addNew} />} />
      <Route path="/about" element={ <About />} />
      <Route path="/" element={ <AnecdoteList anecdotes={anecdotes} />} />
      <Route path="/anecdote/:id" element={<Note anecdotes={anecdotes} />} />
    </Routes>

    <div>
    <Footer />
    </div>
  </Router>
)

  
}

export default App
