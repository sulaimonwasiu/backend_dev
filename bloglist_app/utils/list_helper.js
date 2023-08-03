/* eslint-disable no-unused-vars */
const _ = require('lodash')


const dummy = (blogs) => {
  const blog_length = 1
  return blog_length
}

const totalLikes = (blogs) => {
  var allLikes = 0
  blogs.forEach((blog) => {
    allLikes += blog.likes
  })
  return allLikes
}

const favoriteBlog = (blogs) => {
  const {title,author,likes, ...others} = _.maxBy(blogs, (o) => o.likes)
  const subset = {title, author, likes}
  return  subset
    
}

const mostBlogs = (blogs) => {
  const author = _.maxBy(blogs, 'author').author
  const blogCount = _.countBy(blogs, 'author')[author]
  return {'author': author,
    'blogs': blogCount
  }
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  
  for (const [key, value] of Object.entries(authors)) {
    authors[key] = totalLikes(value)
  }

  console.log(authors)

  const result = Object.entries(authors)
    .sort((prev, next) => next[1] - prev[1])
    .shift()

  console.log(result)
    
  return {'author': result[0],
    'likes': result[1]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}