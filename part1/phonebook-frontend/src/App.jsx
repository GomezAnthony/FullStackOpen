import { useState } from 'react';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFiltered] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const addPersonObject = {
      name: newName,
      number: newNumber,
    };
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      setPersons(persons.concat(addPersonObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const personsFiltered = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  console.log(personsFiltered);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredChange = (event) => {
    setFiltered(event.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilteredChange} />
      <h2>Phonebook</h2>
      <PersonForm
        onSubmit={addPerson}
        nameVal={newName}
        numberVal={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default App;
