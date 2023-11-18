import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PORT = 4000

const URI = `http://localhost:${PORT}/users/`

const CompCreateUser = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [enabled, setEnabled] = useState('')
  const navigate = useNavigate()

  // Procedure to save User
  const save = async (e) => {
    e.preventDefault()
    await axios.post(URI, { user, fullname })
    navigate('/')
  }

  return (
    <div>
      <h1>Create a new User</h1>
      <form onSubmit={save}>
        <div className='mb-3'>
          <label className='form-label'>Usuario</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>user</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>fullname</label>
          <textarea
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
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

export default CompCreateUser
