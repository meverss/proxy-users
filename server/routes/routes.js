import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser, updateUserNoPass } from '../controllers/UsersController.js'
import { searchUsers, getUserName } from '../controllers/UsersController.js'

const router = Router()

// Routes
router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/whoami', getUserName)
router.use('/search', searchUsers)
router.get('/:id', getOneUser)
router.patch('/:id', updateUser)
router.patch('/:id/nopwd', updateUserNoPass)
router.delete('/:id', deleteUser)

export default router
