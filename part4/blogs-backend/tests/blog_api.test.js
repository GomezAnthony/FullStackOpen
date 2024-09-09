const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blogs');
const mongoose = require('mongoose');
const helper = require('../utils/test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(helper.initialBlogs[1]);
  await blogObj.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('this first blog is about Atomic Habits', async () => {
  const response = await api.get('/api/blogs');

  const title = response.body.map((e) => e.title);
  assert.strictEqual(title.includes('Atomic Habits'), true);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Million Dollar Weekend',
    author: 'Noah Kagan',
    url: 'www.google.com',
    likes: 200,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((r) => r.title);
  assert(contents.includes('Million Dollar Weekend'));
});

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'Making Money',
    url: 'www.spooner.com',
    likes: 20,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.deepStrictEqual(resultBlog.body, blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((r) => r.title);
  assert(!titles.includes(blogToDelete.title));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
