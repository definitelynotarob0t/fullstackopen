import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newFilter, setNewFilter}) => {
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return(
    <div>
      <>Filter shown with:</>
      <input
      value={newFilter}
      onChange={handleNewFilter}
      ></input>
    </div>
  )
}

const AddContact = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const mostRecentName = personObject.name
    const personNames = (persons.map(person => person.name))

    if (personNames.includes(mostRecentName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')    
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input 
      value={newName}
      onChange={handleNewName}
      />
    </div>
    <div>number: <input
    value={newNumber}
    onChange={handleNewNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )

}

const FilteredContacts = ({persons, newFilter}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
      <div>
        {filteredPersons.map(person => 
        <div key={person.id}>{person.name} {person.number}</div>
      )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

 const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h3>Add a new contact</h3>
      <AddContact
      newName={newName} setNewName={setNewName} newNumber={newNumber} 
      setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} 
      />
      <h3>Contacts</h3>
      <FilteredContacts persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App