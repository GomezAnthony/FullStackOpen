const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'Yet another blog',
      author: 'Jane Doe',
      url: 'https://example.com/another-blog',
      likes: 12,
      __v: 0,
    },
  ];

  const emptyList = [];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 25);
  });

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes(emptyList);
    assert.strictEqual(result, 0);
  });

  describe('favorite blog', () => {
    test('when list has multiple blogs, returns the one with most likes', () => {
      const result = listHelper.favBlog(listWithMultipleBlogs);
      const expected = {
        _id: '5a422aa71b54a676234d17f0',
        title: 'Yet another blog',
        author: 'Jane Doe',
        url: 'https://example.com/another-blog',
        likes: 12,
        __v: 0,
      };
      assert.deepStrictEqual(result, expected);
    });

    test('when list is empty, returns null', () => {
      const result = listHelper.favBlog(emptyList);
      assert.strictEqual(result, null);
    });
  });
});
