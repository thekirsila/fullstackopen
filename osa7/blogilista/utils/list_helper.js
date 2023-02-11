var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  for (let index = 0; index < blogs.length; index++) {
    sum += blogs[index].likes;
  }
  return sum
}

const favoriteBlog = (blogs) => {
  let fav = blogs[0]
  for (let index = 1; index < blogs.length; index++) {
    if (Number(blogs[index].likes) > Number(fav.likes)) {
      fav = blogs[index]
    }
  }
  return fav
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author")

  return {
    "author": Object.keys(authors)[Object.values(authors).indexOf(_.max(Object.values(authors)))],
    "blogs": _.max(Object.values(authors)),
  }
}

const mostLikes = (blogs) => {
  const authors = Object.keys(_.groupBy(blogs, "author"))
  let authorObjs = []

  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];
    authorObjs.push({ "author": author, "likes": 0 })
  }

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    for (let j = 0; j < authorObjs.length; j++) {
      const obj = authorObjs[j];
      if (obj.author == blog.author) {
        obj.likes += blog.likes
      }
    }
  }

  const mostLikes = _.head(_.orderBy(authorObjs, ['likes'], ['desc']))
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}