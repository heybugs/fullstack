import React, { useState, useEffect } from 'react';
import { getAll, createPerson, deletePerson, updatePerson } from './request';
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

const Person = ({ persons, setPersons }) => {
  const handleDeleteClick = (item) => {
    let result = window.confirm(`Delete ${item.name}?`);
    if (result) {
      deletePerson(item.id).then((res) => {
        // getAll().then((allData) => {
        //   setPersons(allData);
        // });
      });
    }
  };
  return persons.map((item, i) => {
    return !item.filter ? (
      <li key={i}>
        {item.name}
        &nbsp;
        {item.number}
        &nbsp;&nbsp;
        <button onClick={() => handleDeleteClick(item)}>delete</button>
      </li>
    ) : undefined;
  });
};

const Notification = ({ msg }) => {
  if (msg.text === '') {
    return null;
  }

  return <div className={msg.type ? 'success' : 'error'}>{msg.text}</div>;
};

const App = () => {
  const [msg, setMsg] = useState({ type: false, text: '' });
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    getAll().then((allData) => {
      setPersons(allData);
    });
  }, []);

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
    let flag = false,
      personId = null;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newPerson.name) {
        flag = true;
        personId = persons[i].id;
      }
    }
    if (flag && personId) {
      let result = window.confirm(
        `${newPerson.name} is already added to phonebook,replace the old number with a new one?`
      );
      if (result) {
        updatePerson(personId, newPerson)
          .then((res, err) => {
            // getAll().then((allData) => {
            //   setPersons(allData);
            // });
          })
          .catch((err) => {
            setMsg({ type: false, text: `${newPerson.name} was deleted ` });
            setTimeout(() => {
              setMsg({ type: false, text: '' });
            }, 2000);
          });
      }
    } else {
      createPerson(newPerson).then((newData) => {
        setPersons(persons.concat(newData));
      });
      setMsg({ type: true, text: `added ${newPerson.name} ` });
      setTimeout(() => {
        setMsg({ type: false, text: '' });
      }, 2000);
    }

    setNewPerson({ filter: false, number: '', name: '' });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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
      <Notification msg={msg} />
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
        <Person persons={persons} setPersons={setPersons} />
      </ul>
    </div>
  );
};

export default App;
