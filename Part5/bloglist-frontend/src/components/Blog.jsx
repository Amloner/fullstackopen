import { useState } from 'react'

const Blog = ({ blog , removeBlog , updateBlog }) =>{ 
  const [display, setDisplay] = useState(false)
  const changeDisaply = () => {
    setDisplay(!display)
  }

  const removeThis = (event) => {
    event.preventDefault()
    alert( blog.title +"will be deleted")
    removeBlog(blog.id)
  }

  const addLike = (event) => {
    event.preventDefault()
    const AddedLike = {...blog, likes : parseInt(blog.likes)+1}
    updateBlog(AddedLike)
    console.log(AddedLike)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(display){
    return(
<div style={blogStyle} className='expandedBlog'>
    <p>{blog.title} <button onClick={changeDisaply}>hide</button></p> 
    <p>{blog.author}</p> 
    <p>{blog.url}</p> 
    <p>Likes {blog.likes}<button onClick={addLike}>like</button></p> 
    <p>{blog.url}</p> 
    <p>{blog.user.name}</p> 
    
    <button onClick={removeThis}>delete</button>
    
  </div>  

    )
  }
  return (
  <div style={blogStyle} className='blog'>
    {blog.title} {blog.author}
    <button onClick={changeDisaply} className='viewButton'>view</button>
  </div>  
)
}
export default Blog