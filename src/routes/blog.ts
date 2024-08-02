import { Router } from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controllers/blog";

const router = Router()

router.get('/', getBlogs)

router.get('/:id', getBlogById)

router.post('/post', createBlog)

router.patch('/post/:id', updateBlog)

router.delete('/:id', deleteBlog)

export default router