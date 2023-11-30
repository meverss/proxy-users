import { Router } from 'express'
import { searchUsers, getUserName, createUser, deleteUser, getAllUsers, getOneUser, updateUser, updateUserNoPass, searchAvailableUser } from '../controllers/UsersController.js'
// import { } from '../controllers/UsersController.js'

const router = Router()

// Routes
router.get('/', getAllUsers)
router.post('/', createUser)
router.get('/whoami', getUserName)
router.get('/search/available', searchAvailableUser)
router.get('/search', searchUsers)
router.get('/:id', getOneUser)
router.patch('/:id/nopwd', updateUserNoPass)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
