import { useEffect, useState } from "react";
import personService from "./services/persons.js";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("add clicked", event.target);
    if (personDetected()) {
      return;
    }
    const newPerson = {
      name: newName,
      number: numbers,
      id: (persons.length + 1).toString(),
    };
    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNumbers("");
    });
  };
  const personDetected = () => {
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return true;
    }
    return false;
  };

  const handleNameChange = (event) => {
    console.log(event.target);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target);
    setNumbers(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target);
    setFilter(event.target.value);
  };

  const personFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(
        initialPersons.map((person) => ({
          ...person,
          id: person.id.toString(),
        }))
      );
    });
  }, []);

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        personService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting person:", error);
            alert("An error occurred while trying to delete the person.");
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter}></Filter>

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        personDetected={personDetected}
        newName={newName}
        handleNameChange={handleNameChange}
        number={numbers}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons
        personFilter={personFilter}
        handleDeletePerson={handleDeletePerson}
      ></Persons>
    </div>
  );
};

export default App;
