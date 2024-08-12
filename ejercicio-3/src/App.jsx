import { useEffect, useState } from "react";
import personService from "./services/persons.js";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import ErrorNotification from "./components/ErrorNotification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [filter, setFilter] = useState("");
  const [rightMessage, setRightMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();
    console.log("add clicked", event.target);
    if (personDetected(newName, numbers)) {
      setNewName("");
      setNumbers("");
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
      setRightMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setRightMessage(null);
      }, 4000);
    });
  };
  const personDetected = (name, newNumber) => {
    const personNumberOld = persons.find((person) => person.name === name);
    if (
      personNumberOld &&
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      if (newNumber !== personNumberOld.number) {
        const personChangeNumber = {
          ...personNumberOld,
          number: newNumber,
        };
        personService
          .update(personNumberOld.id, personChangeNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personNumberOld.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setMessageError(
              `Information of ${personNumberOld.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessageError(null);
            }, 4000);
            setPersons(persons.filter((person) => person.name !== name));
          });
      }
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
      const personsWithStringIds = initialPersons.map((person) => ({
        ...person,
        id: String(person.id),
      }));
      setPersons(personsWithStringIds);
    });
  }, []);

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === String(id));
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== String(id)));
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert("An error occurred while trying to delete the person.");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageRight={rightMessage}></Notification>
      <ErrorNotification messageError={messageError}></ErrorNotification>

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
