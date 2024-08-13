const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://phonebook-fs:${password}@cluster0.ovcqu.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

// Would not connect since my network sucks, so async/await is the solution
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

async function fetchPhonebookEntries() {
  try {
    const result = await Phonebook.find({});
    result.forEach((phonebook) => {
      console.log(phonebook);
    });
  } catch (err) {
    console.error('Error fetching phonebook entries:', err);
  } finally {
    mongoose.connection.close();
  }
}

async function main() {
  await connectToDatabase();
  await fetchPhonebookEntries();
}

main();
