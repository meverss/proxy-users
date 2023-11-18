import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PORT = 4000

const URI = `http://localhost:${PORT}/users/`

const CompCreateUser = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const navigate = useNavigate()

  // Procedure to save User
  const save = async (e) => {
    e.preventDefault()
    await axios.post(URI, { user, password, fullname })
    navigate('/')
  }

  return (
    <div className='container'>
      <h1>Crear nuevo Usuario</h1>
      <form onSubmit={save}>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
          <input
            className='form-control'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type='text'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
          <input
            className='form-control'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type='text'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='inputGroup-sizing-default'>Contraseña</span>
          <input
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <div className='formButtons'>
          <button
            type='button' className='btn btn-secondary' onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button type='submit' className='btn btn-primary'>
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CompCreateUser
