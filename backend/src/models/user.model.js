const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    email :{
        type : String,
        required : true,
    },
    company :{
        type : String,
        required : true,
    
    }
})

const user  = mongoose.model("users",userSchema)

module.exports = user