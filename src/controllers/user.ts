import { RequestHandler } from "express";
import User from "../models/user";


export const getUsers: RequestHandler  = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json({users});
    }
    catch {
        res.status(500).json({error:'Failed to fetch user'})
    } 

}

export const getUserById: RequestHandler<{id:string}>  = async (req, res, next) => {
    const userId = req.params.id
   
    try {
        const user = await User.findByPk(userId)
        if(user) res.status(200).json({user})
        else  res.status(404).json({error:'user does not exist'})
    }
    catch {
        res.status(500).json({error:'Failed to fetch user'})
    } 
    
}

export const createUser: RequestHandler = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    try{
        const user = await User.create({firstName, lastName, email})
        res.status(201).json({
            message:'user created successfully',
            user
        })
    }
    catch {
        res.status(500).json({error:'Failed to created user'})
    } 

    
}

export const updateUser: RequestHandler<{id:string}>  = async (req, res, next) => {
    const userId = req.params.id;
    const {firstName, lastName, email} = req.body;
    try{
        const [updatedRows] = await User.update({firstName, lastName, email}, {where: {id:userId}});

        if(updatedRows>0) res.status(200).json({message:'User updated successfully'})
        else res.status(404).json({error:'User not found'})
    }
    catch {
        res.status(500).json({error:'Failed to edit user'})
    }

}

export const deleteUser: RequestHandler<{id:string}>  = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const deletedRows = await User.destroy({where: {id:userId}});

        if(deletedRows>0) res.status(200).json({message:'User deleted successfully'})
        else res.status(404).json({error:'User not found'})
    }
    catch {
        res.status(500).json({error:'Failed to delete User'})
    }
    
}