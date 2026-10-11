const express = require('express')
const app = express()

app.use(express.json())

let PhoneBook =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(PhoneBook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = PhoneBook.find((n) => n.id == id)
  
  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
  
})

app.get('/info', (request, response) => {
  const d = new Date()
  const l = PhoneBook.length
  response.send(`<p>Phonebook has info for ${l} people.</P> <P>${d}</P>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = PhoneBook.find((n) => n.id == id)
  
  if(person){
    PhoneBook = PhoneBook.filter((n) => n.id != id )
    response.json(PhoneBook)
  }
  else{
    response.status(404).end()
  }

})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random()*10000).toString()
  const person = {
    id : id,
    name: request.body.name,
    phone: request.body.number
  }

  PhoneBook.push(person)
  response.json(PhoneBook)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})