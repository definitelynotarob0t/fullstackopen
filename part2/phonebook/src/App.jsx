import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === "") {
    return null
  }
  if (message.startsWith("Information of")) {
    return (
      <div className='error'>
      {message}
    </div>
    )
  }
  return (
    <div className='success'>
      {message}
    </div>
  )

}

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

const AddContact = ({newName, setNewName, newNumber, setNewNumber, persons, updateNumber, createPerson}) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const mostRecentName = personObject.name
    const existingNames = (persons.map(person => person.name))


    if (existingNames.includes(mostRecentName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) { 
        const personToUpdate = persons.find((person) => person.name === newName)
        updateNumber(personObject, personToUpdate.id)
      } 
    } else {
      createPerson(personObject)
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

const FilteredContacts = ({persons, newFilter, deletePerson}) => {

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id, persons)
    } 
  }
  return (
      <div>
        {filteredPersons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => confirmDelete(person)}>delete</button>
          </div>
      )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [setPersons])

  const createPerson = (personObject) => {
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setErrorMessage( `Added ${personObject.name}`)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
      })
  }

  const deletePerson = (id, persons) => {
    personService
    .remove(id)
    .then(() => {
      setPersons(persons => persons.filter(person => person.id !== id))
    })
  }

  const updateNumber = (personObject, id) => {
    const index = persons.findIndex(person => person.id === id)
    const updatedPerson = { ...persons[index], number: personObject.number }
  
    personService
    .update(id, personObject)
    .then(() => {
      setPersons(persons => persons.map(person => person.id !== id ? person : updatedPerson))
      setErrorMessage(`${personObject.name}'s phone number has been updated`)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    })
      .catch(error => {
        setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage("")
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h3>Add a new contact</h3>
      <AddContact
      newName={newName} 
      setNewName={setNewName} 
      newNumber={newNumber} 
      setNewNumber={setNewNumber} 
      persons={persons} 
      updateNumber={updateNumber}
      createPerson={createPerson} 
      />
      <h3>Contacts</h3>
      <FilteredContacts persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App