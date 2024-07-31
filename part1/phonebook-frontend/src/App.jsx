import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import PersonForm from '../components/PersonForm';
import Persons from '../components/Persons';

import personService from './services/person';
import Notification from '../components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFiltered] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotification({
              message: `Updated ${returnedPerson.name}'s number`,
              type: 'success',
            });
            setTimeout(() => {
              setNotification({ message: '', type: '' });
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            setNotification({
              message: `Error: ${newName} was already removed from server`,
              type: 'error',
            });
            setTimeout(() => {
              setNotification({ message: '', type: '' });
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      const addPersonObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(addPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification({
          message: `Added ${addPersonObject.name}`,
          type: 'success',
        });
        setTimeout(() => {
          setNotification({ message: '', type: '' });
        }, 5000);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const removeContact = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (
      personToRemove &&
      window.confirm(`Are you sure you want to delete ${personToRemove.name}?`)
    ) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Deleted ${personToRemove.name}`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification({ message: '', type: '' });
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `Error: ${personToRemove.name} was already removed from server`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification({ message: '', type: '' });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
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
      <Notification message={notification.message} type={notification.type} />
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
