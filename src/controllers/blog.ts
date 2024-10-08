import { RequestHandler } from "express";
import Blog from "../models/blog";
import User from "../models/user";


export const getBlogs: RequestHandler  = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            include: {
              model: User,
              attributes: ['id', 'firstName', 'lastName', 'email'] // Adjust attributes as necessary
            }
          })
        res.status(200).json({blogs});
    }
    catch {
        res.status(500).json({error:'Failed to fetch blog'})
    } 

}

export const getBlogById: RequestHandler<{id:string}>  = async (req, res, next) => {
    const blogId = req.params.id
   
    try {
        const blog = await Blog.findByPk(blogId, {
            include: {
              model: User,
              attributes: ['id', 'firstName', 'lastName', 'email'] // Adjust attributes as necessary
            }
          })
        if(blog) res.status(200).json({blog})
        else  res.status(404).json({error:'Blog does not exist'})
    }
    catch {
        res.status(500).json({error:'Failed to fetch blog'})
    } 
    
}

export const createBlog: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.userId;

    try{
        const blog = await Blog.create({title, content, userId})
        res.status(201).json({
            message:'blog created successfully',
            blog
        })
    }
    catch {
        res.status(500).json({error:'Failed to create blog'})
    } 

}

export const updateBlog: RequestHandler<{id:string}>  = async (req, res, next) => {
    const blogId = req.params.id;
    const {title, content} = req.body;
    try{
        const [updatedRows] = await Blog.update({title, content}, {where: {id:blogId}});

        if(updatedRows>0) res.status(200).json({message:'Blog updated successfully'})
        else res.status(404).json({error:'Blog not found'})
    }
    catch {
        res.status(500).json({error:'Failed to edit blog'})
    }

    
}

export const deleteBlog: RequestHandler<{id:string}>  = async (req, res, next) => {
    const blogId = req.params.id;
    try {
        const deletedRows = await Blog.destroy({where: {id:blogId}});

        if(deletedRows>0) res.status(200).json({message:'Blog deleted successfully'})
        else res.status(404).json({error:'Blog not found'})
    }
    catch {
        res.status(500).json({error:'Failed to delete Blog'})
    }
    
}