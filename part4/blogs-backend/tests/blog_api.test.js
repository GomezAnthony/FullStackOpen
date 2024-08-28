const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blogs');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
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

  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1); // This!!!!

  assert(contents.includes('Million Dollar Weekend'));
});

after(async () => {
  await mongoose.connection.close();
});
