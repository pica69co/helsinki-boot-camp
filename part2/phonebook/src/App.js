import { useState, useEffect } from "react";
import Content from "./components/Content";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [messageError, setMessageError] = useState(null);

  // console.log('persons: ', persons);
  // console.log('allPersons: ', allPersons);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setAllPersons(initialPersons);
      setPersons(initialPersons);
    });
  }, [messageError]);

  const addPerson = (event) => {
    event.preventDefault();
    const person = allPersons.filter((person) => person.name === newName);

    const uniqueName = person[0];
    const updatedPerson = { ...uniqueName, number: newNumber };

    if (person.length !== 0) {
      if (
        window.confirm(
          `${uniqueName.name} is already added to the phonebook, replace the old number with a new one ?`
        )
      ) {
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            console.log(`${returnedPerson.name} successfully updated`);
            setAllPersons(
              allPersons.map((personItem) =>
                personItem.id !== uniqueName.id ? personItem : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessageError(`${updatedPerson.name} was successfully updated`);
            setTimeout(() => {
              setMessageError(null);
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            setAllPersons(
              allPersons.filter((person) => person.id !== updatedPerson.id)
            );
            setNewName("");
            setNewNumber("");
            setMessageError(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            );
            setTimeout(() => {
              setMessageError(null);
            }, 2000);
          });
      }
    } else {
      const uniqueName = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(uniqueName)
        .then((returnedPerson) => {
          setAllPersons(allPersons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessageError(`${newName} was successfully added`);
          setTimeout(() => {
            setMessageError(null);
          }, 3000);
        })
        .catch((error) => {
          setMessageError(`[ERROR] ${error.response.data.error}`);
          setTimeout(() => {
            setMessageError(null);
          }, 4000);
          console.log(error.response.data);
        });
    }
  };

  const deletePerson = (id) => {
    const filteredPerson = allPersons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.remove(personId);
      console.log(`${personName} successfully deleted`);
      setMessageError(`${personName} was successfully deleted`);
      setAllPersons(allPersons.filter((person) => person.id !== personId));
      setTimeout(() => {
        setMessageError(null);
      }, 3000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    const regex = new RegExp(newFilter, "i");
    const filteredPersons = () =>
      allPersons.filter((person) => person.name.match(regex));
    setPersons(filteredPersons);
  };

  return (
    <div style={{ paddingLeft: 25 }}>
      <h2>Phonebook</h2>
      <Notification message={messageError} />

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>Add new person</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Content
        persons={persons}
        allPersons={allPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
