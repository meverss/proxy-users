import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CompEditBlog from './EditBlog.js'

const PORT = 4000

const URI = `http://192.168.181.15:${PORT}/blogs/`
const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    getBlogs()
  }, [])

  // Procedure to show all blogs
  const getBlogs = async () => {
    const res = await axios.get(URI)
    setBlogs(res.data)
  }

  // Procedure to delete a blog
  const deleteBlog = async (id) => {
    await axios.delete(URI + id)
    getBlogs()
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Link to='/create' className='new-record btn btn-outline-success  me-md-2'>New</Link>
            </div>
            <table className='table table-responsive table-sm table-hover'>
              <thead className='table-dark'>
                <tr>
                  <th scope='col'>Title</th>
                  <th scope='col'>Content</th>
                  <th scope='col'>Last Update</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td> {blog.title} </td>
                    <td> {blog.content} </td>
                    <td> {blog.updatedAt} </td>
                    <td className='actions'>
                      <Link to={`/edit/${blog.id}`} className='btn btn-info'><i className='far fa-edit' /></Link>
                      <button className='btn btn-danger' onClick={() => deleteBlog(blog.id)}><i className='far fa-trash-can' /></button>
                    </td>
                    {/* <CompEditBlog id={blog.id} /> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompShowBlogs
