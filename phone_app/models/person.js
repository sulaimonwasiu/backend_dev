require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;


async function dbConnect(){
    try{
        await mongoose.connect(url);
        console.log('connected to MongoDB');

        //mongoose.connection.close();
    }catch(error){
        console.log('error connecting to MongoDB:', error.message);
    }
}

dbConnect();

// Schema 
const personSchema = new mongoose.Schema({
    name: String,
    number: String
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

