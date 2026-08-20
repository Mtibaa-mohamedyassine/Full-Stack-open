import { useState } from "react"


const App = () => {
  const [Persons, setPersons] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')

  const handleNewChange = (event) => {
    setNewName(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    
    const np = {name: newName}

    const Exist = Persons.some(person => newName === person.name)

    if(!Exist){
      setPersons(Persons.concat(np))
    }

    setNewName('')
  }
  return(
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={addPerson}>
        name: <input onChange={handleNewChange} value={newName} />
        <button type="submit" >add</button>
      </form>
      <h1>Numbers</h1>
      <div>
        {Persons.map((person) => (<p>{person.name}</p>))}
      </div>
    </div>
  )
}

export default App