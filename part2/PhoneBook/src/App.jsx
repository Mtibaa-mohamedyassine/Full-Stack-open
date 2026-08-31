import { useState, useEffect } from "react"
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from "./components/Notification"
import BackendServices from './Services/BackendServices'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [newNotification, setNotification] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('')


  const handleNewChange = (event) => setNewName(event.target.value)
  const handleChangePhone = (event) => setNewPhone(event.target.value)
  const handleChangeQuery = (event) => setNewQuery(event.target.value)

  const handleDelete = (objectId) => {
    const person = persons.find(p => p.id == objectId)
    if(!person) return

    if(window.confirm(`Shure to delete ${person.name}`))
      BackendServices
        .deleteFromDb(objectId)
        .then(person => {
          setPersons(persons.filter(p => p.id != objectId))
          setNotificationStatus('info')
          setNotification(`person with this id: ${objectId} deleted form the server`)
          setTimeout(() => {
            setNotification(null)
          },5000)
        })
        .catch(error => {
          console.log(`failed to delete from the server the person with this id: ${objectId}`)
          setNotificationStatus('error')
          setNotification(`failed to delete from the server the person with this id: ${objectId}`)
        })
  }
    

  const addPerson = (event) => {
    event.preventDefault()
    
    const np = {name: newName, number:newPhone}

    const existPerson = persons.find(person => newName === person.name)

    if(!existPerson)
    {
      BackendServices
        .addToDb(np)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          console.log('pushed to the server succesfully!')
          console.log(returnedPerson)
          setNotificationStatus('info')
          setNotification(`Added ${np.name}`)
          setTimeout(() => {
                    setNotification(null)
          }, 5000)
        })
    }
    else if(existPerson && np.number != existPerson.number)
    {
      if(window.confirm(`${np.name} exist, do you want to replace the old number by ${np.number}`))
      {
        BackendServices
          .updateDb(np, existPerson.id)
          .then((resonse => {
            console.log(`${np.name} updated successfully!`)
            const newPersonsList = persons.map(person => person.name === np.name ? {...person, number: np.number}: person)
            setPersons(newPersonsList)
            setNotificationStatus('info')
            setNotification(`${np.name} is updated`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          }))
          .catch(() => {
            setNotificationStatus('error')
            setNotification(`Information of ${np.name} has already been romoved from server`)
            setTimeout(() => {
              setNotification(null)
            },5000)
          })
      }
    }
    else
    {
      setNotificationStatus('info')
      setNotification(`${newName} is already added to PhoneBook`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    

  }

  useEffect(() => {
    console.log('1st load')

    BackendServices
      .getAll()
      .then(data => {
        setPersons(data)
        console.log('promise fulfilled')
        console.log(data)
      })
  }, [])

  const personsToShow = persons.filter((contact) => (contact.name.toLowerCase().includes(newQuery.toLowerCase())))
  
  
  return(
    <div>
      <h1>PhoneBook</h1>
     
      <Filter handleChangeQuery={handleChangeQuery} />

      <Notification message={newNotification} status={notificationStatus} />

      <h1>Add a new</h1>
      
      <PersonForm addPerson={addPerson} 
                  handleNewChange={handleNewChange} 
                  handleChangePhone={handleChangePhone} 
                  newName={newName}
                  newPhone={newPhone} />

      <h1>Numbers</h1>
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />

    </div>
  )
}


export default App