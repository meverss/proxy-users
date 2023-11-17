import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PORT = 4000

const URI = `http://192.168.181.15:${PORT}/blogs/`

const CompCreateBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  // Procedure to save blog
  const save = async (e) => {
    e.preventDefault()
    await axios.post(URI, { title, content })
    navigate('/')
  }

  return (
    <div>
      <h1>Create a new blog</h1>
      <form onSubmit={save}>
        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='formButtons'>
          <button
            type='button' className='btn btn-secondary' onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default CompCreateBlog
