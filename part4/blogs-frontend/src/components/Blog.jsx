import { useState } from 'react';

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showBlog = () => {
    setShow(!show);
    console.log(show);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={showBlog}>View</button>
      {show ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span>{blog.author}</span>
          <span>{blog.url}</span>
          <span>
            {blog.likes} <button>Like</button>
          </span>
        </div>
      ) : (
        !show
      )}
    </div>
  );
};

export default Blog;
