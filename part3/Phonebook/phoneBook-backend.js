const express = require('express')
const cors = require('cors')
const app = express()

const morgan = require('morgan')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  const name = request.body.name
  const number = request.body.number

  if (!name) {
    return response.status(400).json({ error: 'name is missing' })
  }

  if (!number) {
    return response.status(400).json({ error: 'number is missing' })
  }

  const exist = PhoneBook.find((n) => n.name === name)
  if (exist) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const id = Math.floor(Math.random() * 10000).toString()
  const person = {
    id: id,
    name: name,
    number: number
  }

  PhoneBook.push(person)
  response.json(PhoneBook)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
