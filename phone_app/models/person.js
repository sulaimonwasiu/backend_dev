const mongoose = require('mongoose');

// Schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 3;
            },
            message: props => `${props.value} is not a valid name! Name must be at least three characters long.`
        }
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{6,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Phone number must have a length of 8 or more and be in the format XX-XXXXXXX or XXX-XXXXXXX.`
        },
        required: [true, 'Phone number required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})
    
const Person = mongoose.model('Person', personSchema)


module.exports = Person;

