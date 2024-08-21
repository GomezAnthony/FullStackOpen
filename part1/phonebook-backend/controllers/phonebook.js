/* eslint-disable no-unused-vars */
/* eslint-disable @stylistic/js/semi */
const phonebookRouter = require('express').Router();
const Phonebook = require('../models/phonebook');

phonebookRouter.get('/', async (request, response) => {
  try {
    const phonebook = await Phonebook.find({});
    response.json(phonebook);
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while fetching data' });
  }
});

phonebookRouter.get('/:id', async (request, response) => {
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
      .send({ error: 'malformatted id' })
      .next(err)
      .json({ error: 'An error occurred while fetching data' });
  }
});

phonebookRouter.delete('/:id', async (request, response) => {
  try {
    await Phonebook.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    response
      .status(500)
      .json({ error: 'An error occurred while deleting data' });
  }
});

phonebookRouter.get('/info', async (request, response) => {
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

phonebookRouter.post('/', async (request, response) => {
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

module.exports = phonebookRouter;
