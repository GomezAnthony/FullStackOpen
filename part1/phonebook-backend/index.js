require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
const Phonebook = require('./models/phonebook');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/persons', async (request, response) => {
  try {
    const phonebook = await Phonebook.find({});
    response.json(phonebook);
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Phonebook.findById(request.params.id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while fetching data' });
  }
});

app.delete('/api/persons/:id', async (request, response) => {
  try {
    await Phonebook.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while deleting data' });
  }
});

app.get('/info', async (request, response) => {
  try {
    const count = await Phonebook.countDocuments({});
    const date = new Date();
    response.send(`<p>Phonebook info has ${count} entries</p>
      <br/>
      ${date.toString()}
      `);
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while fetching data' });
  }
});

app.post('/api/persons', async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  try {
    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (err) {
    response.status(500).json({ error: 'An error occurred while saving data' });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
