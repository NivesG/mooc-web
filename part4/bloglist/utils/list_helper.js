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


const mostLikes = (blogs) => {
  if(blogs.length === 0)
    return null
  const topBlogs = (getTotalLikes(blogs))
  const max = topBlogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })
  return max
}


const getTotalLikes = arr =>
  Object.values(
    arr.reduce((acc, { author, likes }) => {
      acc[author] =
        author in acc
          ? { author, likes: acc[author].likes + likes }
          : { author, likes: likes }
      return acc
    }, {})
  )


const blogsAuthor = (blogs) => {
  const key = 'author'
  let arr2 = []
  blogs.forEach((x) => {
    if(arr2.some((val) => { return val[key] === x[key] })){
      arr2.forEach((k) => {
        if(k[key] === x[key]){
          k[ 'blogs' ]++
        }
      })

    }else{
      let a = {}
      a[key] = x[key]
      a[ 'blogs' ] = 1
      arr2.push(a);
    }
  })
  console.log(arr2)
  return arr2
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0)
    return null
  const topBlogs = (blogsAuthor(blogs))
  const max = topBlogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })
  return max
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs
}