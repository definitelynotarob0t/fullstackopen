import { useState } from 'react'

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
      phoneNumber: newNumber,
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
        <div key={person.id}>{person.name} {person.phoneNumber}</div>
      )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
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