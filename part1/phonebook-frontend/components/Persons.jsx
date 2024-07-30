/* eslint-disable react/prop-types */
import Button from './Button';

function Persons({ persons, handleDelete }) {
  return (
    <div>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <Button onClick={handleDelete} id={person.id} label="Delete" />
        </li>
      ))}
    </div>
  );
}

export default Persons;
