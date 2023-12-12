const app = require(".") // This will import the index.js file from the current directory
require("dotenv").config() 

const connectToDB = require("./configs/db")

const PORT = process.env.PORT
app.listen(PORT, async()=>{
    
    await connectToDB()
    console.log("Database connected")

    console.log("Server is running at http://localhost:"+PORT)
})


