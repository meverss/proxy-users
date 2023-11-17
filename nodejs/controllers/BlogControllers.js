import BlogModel from '../models/BlogModel.js'

// -- Methods for CRUD --//

// Show ALL records
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll()
    res.json(blogs)
  } catch (error) {
    res.json({ message: error.message })
  }
}

// Show ONE record
export const getOneBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll({
      where: { id: req.params.id }
    })
    res.json(blogs)
  } catch (error) {
    res.json({ message: error.message })
  }
}

// CREATE a record
export const createBlog = async (req, res) => {
  try {
    await BlogModel.create(req.body)
    res.json({ message: 'Blog created successfully' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

// UPDATE a record
export const updateBlog = async (req, res) => {
  try {
    await BlogModel.update(req.body, {
      where: { id: req.params.id }
    })
    res.json({ message: 'Record updated successfully' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

// DELETE a record
export const deleteBlog = async (req, res) => {
  try {
    await BlogModel.destroy({
      where: { id: req.params.id }
    })
    res.json({ message: 'Record deleted successfully' })
  } catch (error) {
    res.json({ message: error.message })
  }
}
