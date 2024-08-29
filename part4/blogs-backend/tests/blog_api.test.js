const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blogs');
const mongoose = require('mongoose');
const helper = require('./test_helper');
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
  const repsonse = await api('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, initialBlogs.length);
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
  assert(contents.includes('async/await simplifies making async calls'));
});

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'Making Money',
    url: 'www.spooner.com',
    likes: 20,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDbInDb();
  assert.strictEqual(blogsAtEndAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
