import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')
  const [newURL, setnewURL] = useState('')
  const [newLikes, setnewLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,      
      likes: newLikes
    })
    setnewTitle('')
    setnewAuthor('')
        setnewURL('')
        setnewLikes('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

     
    <form onSubmit={addBlog}>
    <div> Title : <input id='title'
        value={newTitle}
        onChange={({ target }) => setnewTitle(target.value)}
      /></div><div> Author : <input id='author'
        value={newAuthor}
        onChange={({ target }) => setnewAuthor(target.value)}
      /></div>
    <div>  URL : <input id='url'
        value={newURL}
        onChange={({ target }) => setnewURL(target.value)}
      /></div>
    <div> Likes : <input id='likes'
        value={newLikes}
        onChange={({ target }) => setnewLikes(target.value)}
      /></div> 
    <div> <button type="submit">save</button></div> 
    </form>  

    </div>
  )
}

export default BlogForm