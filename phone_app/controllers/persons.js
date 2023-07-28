const personsRouter = require('express').Router();
const Person = require('../models/person');


personsRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
    
});

personsRouter.get('/:id', (req, res, next) => {
    
    const id = req.params.id;
    Person.findById(id).then(person => {
        if (person){
            res.json(person);
        } else{
            res.status(400).end();
        }
        
    }).catch(error => next(error));
});

personsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id).then(result => {
        if (result)
            res.status(204).end();
        else
            res.status(400).json({
                message:`The person with id: ${id} no longer exists in the database`
            })
    }).catch(error => {
        logger.error(error);
        next(error);
    });
});

// POST REQUEST
personsRouter.post('/', (req, res, next) => {
    const body = req.body;
    // console.log(body);

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
    .catch(error => next(error));
});

// PUT: Update

personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter;