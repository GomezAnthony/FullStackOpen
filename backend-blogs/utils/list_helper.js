const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  let maxLikes = -1;
  let favoriteBlog = null;

  for (const blog of blogs) {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  }

  return favoriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
