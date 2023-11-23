import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SERVER } from './ShowUsers.js'

const URI = `${SERVER}/users/`

const CompEditUser = () => {
  const [auth, setAuth] = useState(false)
  const [username, setUsernam] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [enabled, setEnabled] = useState('')
  const navigate = useNavigate()

  const { id } = useParams()

  axios.defaults.withCredentials = true
  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(SERVER)
      if (res.data.Status === 'success') {
        setAuth(true)
        setUsernam(res.data.fullname)
        console.log(res.data.Status)
      } else {
        navigate('/login')
      }
    }
    verifyUser()
    getUserById()
  }, [])

  // Procedure for updating User
  const updateUser = async (e) => {
    e.preventDefault()
    if (password === '') {
      await axios.patch(URI + id + '/nopwd', { user, fullname, enabled })
    } else {
      await axios.patch(URI + id, { user, fullname, password, enabled })
    }
    navigate('/')
  }

  const getUserById = async () => {
    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')
    const res = await axios.get(URI + id)
    setUser(res.data.user)
    setFullname(res.data.fullname)
    setEnabled(res.data.enabled)

    if (res.data.enabled === 1) {
      stateSwitch.checked = true
      stateLabel.innerHTML = 'Activo'
    } else {
      stateSwitch.checked = false
      stateLabel.innerHTML = 'Inactivo'
    }
  }

  const checkState = () => {
    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')

    if (enabled === 1) {
      stateSwitch.checked = false
      stateLabel.innerHTML = 'Inactivo'
      setEnabled(0)
    } else {
      stateSwitch.checked = true
      stateLabel.innerHTML = 'Activo'
      setEnabled(1)
    }
  }

  return (
    <>
      <div className='editBox '>
        <div className='container editUser shadow-sm'>
          <h1 className='appTitle fw-bold mb-3'>Editar datos de {fullname}</h1>
          <form onSubmit={updateUser}>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
              <input
                className='form-control'
                placeholder={user}
                onChange={(e) => setUser(e.target.value)}
                type='text'
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
              <input
                className='form-control'
                placeholder={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type='text'
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='passwd'>Contraseña</span>
              <input
                className='form-control'
                placeholder='********'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </div>
            <div className='form-switch' >
              <input className='form-check-input' id='userState' type='checkbox' role='switch' onChange={checkState} /> &nbsp;
              <label className='form-check-label' id='userStateLabel' htmlFor='flexSwitchCheckDefault' />
            </div>
            <br />
            <div className='formButtons'>
              <button
                type='button' className='btn btn-secondary' onClick={() => navigate('/')}
              >
                Cancelar
              </button>
              <button type='submit' className='btn btn-success'>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CompEditUser
