const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    url: 'www.google.com',
    likes: 100,
  },
  {
    title: 'Million Dollar Weekend',
    author: 'Noah Kagan',
    url: 'www.google.com',
    likes: 200,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Making Money' });
  await blog.save();
  await blogdeleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
