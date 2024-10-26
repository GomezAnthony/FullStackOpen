import { useState } from 'react';

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes); // Initialize likes from the blog prop
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showBlog = () => {
    setShow(!show);
  };

  const likeBlogPost = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!blog._id) {
        console.error('Blog ID is undefined');
        return;
      }

      // Optimistically update likes
      setLikes(likes + 1);

      const updatedData = {
        user: blog.user._id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update likes');
      }

      const updatedBlog = await response.json();
      setLikes(updatedBlog.likes);
    } catch (error) {
      console.error('Error liking blog post:', error);
      // Optionally revert optimistic update if there's an error
      setLikes(likes); // Revert back to previous count if needed
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={showBlog}>View</button>
      {show && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span>{blog.author}</span>
          <span>{blog.url}</span>
          <span>
            {likes} <button onClick={likeBlogPost}>Like</button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Blog;
