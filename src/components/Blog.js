import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, showRemove }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = (value) => setShow(value)

  if (show) {
    return (
      <div style={blogStyle}>
        <div className='content' onClick={() => toggleShow(false)}>
          <p>{blog.title} {blog.author}</p>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes <button onClick={(event) => onLike(event, blog.id)}>like</button></p>
          <p>added by {blog.user.name}</p>
          {showRemove ?
            <button onClick={() => onRemove(blog.id)}>remove</button> :
            null
          }
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className='content' onClick={() => toggleShow(true)}>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  showRemove: PropTypes.bool,
  onRemove: PropTypes.func.isRequired
}

export default Blog
