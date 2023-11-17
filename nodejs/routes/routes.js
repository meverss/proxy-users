import { Router } from 'express'
import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog } from '../controllers/BlogControllers.js'

const router = Router()

// Routes
router.get('/', getAllBlogs)
router.get('/:id', getOneBlog)
router.post('/', createBlog)
router.patch('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router
