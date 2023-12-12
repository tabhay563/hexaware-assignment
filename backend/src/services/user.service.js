const User = require('../models/user.model')


const createUser = async (userData) =>{
    try {
        let {name,email,username,phone,company} = userData

        const userAlreadyExist = await User.findOne({email})

        if(userAlreadyExist){
            throw new Error("User already exist with this email")
        }

        const user  = new User({
            name,
            email,
            username,
            phone,
            company
        
        })
        return await user.save()


    }catch(err){
        throw new Error(err.message)
    }
}

const getAllUsers = async () =>{
    try{
        return await User.find({})
    }catch(err){
        throw new Error(err.message)
    }
}

const getUserById = async (id) =>{
    try{
        const user = await User.findById(id)
        if(!user){
            throw new Error("User not found")
        }
        return user
    }catch(err){
        throw new Error(err.message)
    }
}

const deleteUser =async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        return deletedUser
    }catch (e){
        throw new Error(e.message)
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser
}
