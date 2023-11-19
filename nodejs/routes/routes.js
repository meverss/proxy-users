import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser, updateUserNoPass } from '../controllers/UsersController.js'

const router = Router()

// Routes
router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.patch('/:id/nopwd', updateUserNoPass)
router.delete('/:id', deleteUser)

export default router
