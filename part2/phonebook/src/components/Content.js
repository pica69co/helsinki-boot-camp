import React from "react";
import Person from "./Person";

const Content = ({ persons, allPersons, deletePerson }) => {
  console.log(persons.length);
  return (
    <ul
      style={{ border: "solid 1px black", width: "fit-content", padding: 35 }}
    >
      {persons.map((person, i) => (
        <Person key={i} person={person} deletePerson={deletePerson} />
      ))}
    </ul>
  );
};

export default Content;
