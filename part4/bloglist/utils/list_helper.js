const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => {
    sum += blog.likes
  })
  return sum
}

const favouriteBlog = (blogs) => {

  let fav = {
    title: '',
    author: '',
    likes: 0
  }

  if (!blogs || blogs.length === 0) {
    return null
  }

  blogs.map((blog) => {
    if (blog.likes > fav.likes) {
      fav = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return fav
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}