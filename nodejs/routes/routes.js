import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getOneUser, searchUsers, updateUser } from '../controllers/UsersController.js'

const router = Router()

// Routes
router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
