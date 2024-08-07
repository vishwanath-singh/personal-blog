import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user";

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/post', createUser)

router.patch('/post/:id', updateUser)

router.delete('/:id', deleteUser)

export default router