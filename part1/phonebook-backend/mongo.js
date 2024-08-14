const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as an argument');
  process.exit(1);
}

// const password = process.argv[2];

mongoose.set('strictQuery', false);

async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

async function addEntry(name, number) {
  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  try {
    await phonebook.save();
    console.log(`added ${name} number ${number} to phonebook`);
  } catch (err) {
    console.error('Error adding entry:', err);
  }
}

async function listEntries() {
  try {
    const entries = await Phonebook.find({});
    console.log('phonebook:');
    entries.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
  } catch (err) {
    console.error('Error listing entries:', err);
  }
}

async function main() {
  await connectToDatabase();

  if (process.argv.length === 3) {
    // No additional arguments, list all entries
    await listEntries();
  } else if (process.argv.length === 5) {
    // Name and number provided, add entry
    const name = process.argv[3];
    const number = process.argv[4];
    await addEntry(name, number);
  } else {
    console.log('Usage: node mongo.js <password> [name number]');
    console.log('Example: node mongo.js yourpassword "Anna" 040-1234556');
    console.log('Or: node mongo.js yourpassword');
    process.exit(1);
  }

  mongoose.connection.close();
}

main();
