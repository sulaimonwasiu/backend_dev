const infoRouter = require('express').Router();
const Person = require('../models/person');

infoRouter.get('/', (req, res, next) => {
    const now = new Date();
    Person.countDocuments({}).then( count => {
        res.send(`<p>Phonebook has info for ${count} persons</p>
              <p>${now.toString()}</p>`);
    }).catch(error => next(error));

    
});

module.exports = infoRouter;