const mongoose = require('mongoose')
const config = require('./utils/config')
 

const dBconnect = async () => {
  try{
    await mongoose.connect(config.MONGODB_URI)
    console.log('Database connected!')
  } catch(error){
    console.error('Not connected!', error.message)
  }
}


module.exports = dBconnect