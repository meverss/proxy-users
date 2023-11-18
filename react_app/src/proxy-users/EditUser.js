import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PORT = 4000

const URI = `http://localhost:${PORT}/users/`

const CompEditUser = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [enabled, setEnabled] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getUserById()
  }, [])

  // Procedure for updating User
  const updateUser = async (e) => {
    e.preventDefault()
    await axios.patch(URI + id, { user, fullname, password, enabled })
    navigate('/')
  }

  const getUserById = async () => {
    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')
    const res = await axios.get(URI + id)
    setUser(res.data.user)
    setPassword(res.data.password)
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
      console.log(enabled)
    } else {
      stateSwitch.checked = true
      stateLabel.innerHTML = 'Activo'
      setEnabled(1)
      console.log(enabled)
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Editar datos de {fullname}</h1>
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
            <span className='input-group-text' id='inputGroup-sizing-default'>Contraseña</span>
            <input
              className='form-control'
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </div>
          <div className='form-switch' style={{ display: 'flex', justifyContent: 'left' }}>
            <input className='form-check-input' id='userState' type='checkbox' role='switch' onChange={checkState} /> &nbsp;
            <label className='form-check-label' id='userStateLabel' htmlFor='flexSwitchCheckDefault' />
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
    </>
  )
}

export default CompEditUser
