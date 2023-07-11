import React from 'react'

const Person = ({person, deletePerson}) =>
  <li>
    {person.name} {person.number} <button 
    style={{background:'red', color:'white', fontWeight:'bold'}}
    onClick={() => deletePerson(person.id)}>delete</button>
  </li>

export default Person