import { useState } from "react"
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"


const App = () => {
  const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newQuery, setNewQuery] = useState('')

  const handleNewChange = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)
  const handleChangeQuery = (event) => setNewQuery(event.target.value)

    

  const addPerson = (event) => {
    event.preventDefault()
    
    const np = {name: newName, number:newPhone}

    const Exist = persons.some(person => newName === person.name)

    if(!Exist)
      setPersons(persons.concat(np))
    else
      alert(`${newName} is already added to PhoneBook`)

    setNewName('')
    setNewPhone('')
  }


  const personsToShow = persons.filter((contact) => (contact.name.toLowerCase().includes(newQuery.toLowerCase())))
  
  
  return(
    <div>
      <h1>PhoneBook</h1>
     
      <Filter handleChangeQuery={handleChangeQuery} />

      <h1>Add a new</h1>
      
      <PersonForm addPerson={addPerson} 
                  handleNewChange={handleNewChange} 
                  handleChangePhone={handleChangePhone} 
                  newName={newName}
                  newPhone={newPhone} />

      <h1>Numbers</h1>
      
      <Persons personsToShow={personsToShow} />

    </div>
  )
}


export default App