/* eslint-disable react/prop-types */
import Button from './Button';

function Persons({ persons, del }) {
  return (
    <div>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <Button onClick={del} label="Delete" />
        </li>
      ))}
    </div>
  );
}

export default Persons;
