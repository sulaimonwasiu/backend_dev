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

app.get('/api/persons/:id', (req, res, next) => {
    /*
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).json({
        message: `Person with id ${id} not found`
    })
    */
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person){
            res.json(person);
        } else{
            res.status(400).end();
        }
        
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id).then(result => {
        if (result)
            res.status(204).end();
        else
            res.status(400).json({
                message:`The person with id: ${id} no longer exists in the database`
            })
    }).catch(error => {
        console.log(error);
        next(error);
    });
});

// POST REQUEST
app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.name){
        return res.status(400).json({
            message: "name missing"
        });
    } else if (!body.number){
        return res.status(400).json({
            message: "number missing"
        });
    } else {
        const person = new Person({
            name: body.name,
            number: body.number
        });
        
        person.save().then(savedPerson => {
            res.json(savedPerson);
        });
    }
});

// PUT: Update

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    };
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  });

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } 
  
    next(error);
}
  
// this has to be the last loaded middleware.
app.use(errorHandler);



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});