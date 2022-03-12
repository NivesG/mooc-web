
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]



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


const mostBlogs = (blogs) => {
  console.log(getTotalLikes(blogs));


}

/*
const mostBlogs = (blogs) => {
  let blog = blogs[0]
  let objArr = Object.entries(blog)
  const filteredUser = objArr.filter(function ([key, value]) {
    return value > 1; // the condition for filter. Change this as you need.
  });
  
  const newObj = Object.fromEntries(filteredUser);
  console.log(newObj);
  console.log(blog);
}

*/

const getTotalLikes = arr =>
  Object.values(
    arr.reduce((acc, { author, likes }) => {
      acc[author] =
        author in acc
          ? { author, totalLikes: acc[author].totalLikes + likes }
          : { author, totalLikes: likes };
      //return acc;
      const zoki = izpis(acc)
      console.log(zoki);
      return zoki
    }, {})
  );

const izpis = (authors) => {
  console.log(authors);
  let authore = authors[0]
  authors.map((author) => {
    if (author.totalLikes > authore.totalLikes) {
      authore = author
      
    }
  })
  
  return authore

}