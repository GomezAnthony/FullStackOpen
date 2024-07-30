import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';

import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFiltered] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const addPersonObject = {
      name: newName,
      number: newNumber,
    };

    // axios
    //   .post('http://localhost:3001/persons', addPersonObject)
    //   .then((response) => {
    //     console.log(response);
    //     setPersons(persons.concat(response.data));
    //     setNewName('');
    //     setNewNumber('');
    //   });

    personService.create(addPersonObject).then((initialPersons) => {
      setPersons(persons.concat(initialPersons));
      setNewName('');
      setNewNumber('');
    });

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

  const removeContact = (id) => {
    const removeCont = persons.filter((person) => person.id !== id);
    personService.remove(id);
  };

  const personsFiltered = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
      <Persons persons={personsFiltered} handleDelete={removeContact} />
    </div>
  );
};

export default App;
