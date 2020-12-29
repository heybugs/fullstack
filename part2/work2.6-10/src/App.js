import React, { useState } from 'react';

const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      filter shown with :{' '}
      <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({
  newPerson,
  handleNameChange,
  handleNumChange,
  handleAddClick,
}) => {
  return (
    <form>
      <div>
        name: <input value={newPerson.name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAddClick}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ persons }) => {
  return persons.map((item, i) => {
    return !item.filter ? (
      <li key={i}>
        {item.name}
        &nbsp;
        {item.number}
      </li>
    ) : undefined;
  });
};

const App = () => {
  const [persons, setPersons] = useState([
    { filter: false, name: 'Arto Hellas', number: '040-123456' },
    { filter: false, name: 'Ada Lovelace', number: '39-44-5323523' },
    { filter: false, name: 'Dan Abramov', number: '12-43-234345' },
    { filter: false, name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
    filter: false,
  });
  const [searchName, setSearch] = useState('');
  const handleNameChange = (e) => {
    setNewPerson({ ...newPerson, name: e.target.value });
  };
  const handleNumChange = (e) => {
    setNewPerson({ ...newPerson, number: e.target.value });
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    let flag = false;
    for (let i = 0; i < persons.length; i++) {
      persons[i].name === newPerson.name ? (flag = true) : (flag = false);
    }

    flag
      ? alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewPerson({ filter: false, number: '', name: '' });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // TODO 使用searchName会少一个字符why
    let searchRegex = new RegExp(e.target.value, 'i');
    persons.filter((item, i) => {
      let isShow = searchRegex.test(item.name);
      item.filter = !isShow;
      return true;
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        handleAddClick={handleAddClick}
      />
      <h2>Numbers</h2>
      <ul>
        <Person persons={persons} />
      </ul>
    </div>
  );
};

export default App;
