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
    username :{
        type : String,
        required : true,
    },
    phone :{
        type : Number,
        required : true,
    
    },
    company :{
        type : String,
        required : true,
    
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
})

const user  = mongoose.model("users",userSchema)

module.exports = user