import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null})
  const [loginVisible, setLoginVisible] = useState(false)


  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null} )
    }, 3000)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')  
    if (loggedUserJSON) {      const user = JSON.parse(loggedUserJSON)     
       setUser(user)   
           }  }, [])

  const handleLogout  = async (event) => {  

    event.preventDefault()  
    setUser(null)
    blogService.setToken(null)
    window.localStorage.setItem( 'loggedBlogAppUser', null) 

  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const add1Blog = (noteObject) => {
    blogService
      .create(noteObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
      })
  }

  const updateBlog = (noteObject) => {
  blogService
  .update(noteObject.id,noteObject)}


  const removeBlog = (id) => {
  blogService
  .remove({

    id : id

  })
}


  const b1logForm = () => (
    <BlogForm createBlog={add1Blog} />

        )
  const handleLogin = async (event) => {    event.preventDefault()    
        try {      const user = await loginService.login({     
             username, password,      })   

             window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(user)) 
          
             blogService.setToken(user.token)
           setUser(user) 
                setUsername('')   
                   setPassword('')   
                   notifyWith(`logged in`)
                   } catch (exception) {    
                      setErrorMessage('Wrong credentials') 
                      notifyWith(`Wrong credentials`, 'error')
                           setTimeout(() => {    
            setErrorMessage(null)      }, 5000)    }  }

            if (user === null) {
              return (
                <div>

      <Notification info={info} />
  {!user && loginForm()} 
      
                </div>
                )
              }

  return (
    <div>
      
      <Notification info={info} />

     
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p> 
      <h3>New Blog</h3>
      {b1logForm()}

      <h2>Blogs</h2>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog= {removeBlog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App