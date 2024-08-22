import { useState } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNumbers("");
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
      <Persons personFilter={personFilter}></Persons>
    </div>
  );
};

export default App;
