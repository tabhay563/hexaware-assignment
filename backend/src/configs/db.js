const mongoose = require('mongoose')

const connectToDB = async () =>{
    try {
      const conne = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conne.connection.host}`)

    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectToDB