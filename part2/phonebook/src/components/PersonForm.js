import React from 'react'

const PersonForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) =>
  <form onSubmit={onSubmit}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button 
            style={{color: 'white',
            fontWeight:'bold', backgroundColor: 'green'}}
            type="submit">add</button>
        </div>
    </form>

export default PersonForm