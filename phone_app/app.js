const config = require('./utils/config')
const express = require('express');
const app = express();
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const infoRouter = require('./controllers/info');


mongoose.set('strictQuery', false);
async function dbConnect(){
    try{
        await mongoose.connect(config.MONGODB_URI);
        logger.info('connected to MongoDB');

        //mongoose.connection.close();
    }catch(error){
        logger.error('error connecting to MongoDB:', error.message);
    }
}
dbConnect();


app.use(express.json());
app.use(middleware.requestLogger)


app.use('/info', infoRouter);
app.use('/api/persons', personsRouter);


app.use(middleware.unknownEndpoint); 
app.use(middleware.errorHandler);

module.exports = app;