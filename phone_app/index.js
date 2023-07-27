require('dotenv').config();
const express = require('express');
const app = express();
const Person = require('./models/person');

app.use(express.json());

/*
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

*/

// Middleware function to log incoming requests
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware function to handle unknown route
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}
  
app.use(logger);

app.get('/info', (req, res) => {
    const now = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} persons</p>
              <p>${now.toString()}</p>`);
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
    
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).json({
        message: `Person with id ${id} not found`
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

// POST REQUEST
const generateId = () => {
    const MAX = 1e10
    return Math.floor(Math.random() * MAX)
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({
            message: "name missing"
        })
    } else if (!body.number){
        return res.status(400).json({
            message: "number missing"
        })
    } else if ((persons.map(person => person.name)).includes(body.name)){
        return res.status(400).json({
            message: "name must be unique"
        })
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId(),
        }
        
        persons = persons.concat(person)
        res.json(person)
    }
})

app.use(unknownEndpoint)



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})