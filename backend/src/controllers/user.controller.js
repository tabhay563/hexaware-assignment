const { collection } = require('../models/user.model');
const userService = require('../services/user.service');


const createUser = async (req, res) =>{
    try{
        const user = await userService.createUser(req.body)
        res.status(201).json({
            message:"User created successfully",
            user
        
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateUser = async (req, res) =>{
    try{
        const user = await userService.getUserById(req.params.id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.company = req.body.company ||  user.company;

        const updatedUser = await user.save();
        res.status(200).json({
            message:"User updated successfully",
            updatedUser
        
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getAllUsers = async (req, res) =>{
    try{
        const users = await userService.getAllUsers()
        res.status(200).json({
            message:"All users",
            users
        
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getUserById = async (req, res) =>{
    try{
        const user = await userService.getUserById(req.params.id)
        res.status(200).json({
            message:"User",
            user
        
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteUser = async (req,res) => {
    try{
        const user = await userService.deleteUser(req.params.id)
        res.status(200).json({
            message:"User deleted successfully",
            user   
        })
    }
    catch(err){
        res.status(500).json({error:err.message})
}
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
}