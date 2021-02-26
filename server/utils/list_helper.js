const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((prev, curr) => {
      return prev.likes > curr.likes ? prev : curr
    })
  }
  return null
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const result = _(blogs).groupBy('author')
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .value()
    .reduce((prev, curr) => (prev.blogs > curr.blogs) ? prev : curr)
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const result = _(blogs).groupBy('author')
    .map((blogs, author) => {
      return {
        author,
        likes: blogs.reduce((sum, blog) => sum + blog.likes, 0)
      }
    })
    .value()
    .reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
