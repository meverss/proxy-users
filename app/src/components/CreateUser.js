import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER } from './ShowUsers.js'
import { isAdmin } from './ShowUsers.js'

const URI = `${SERVER}/users/`

const CompCreateUser = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [vpassword, setVPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [message, setMessage] = useState('')
  const [available, setAvailable] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      const verifyUser = async () => {
        const res = await axios.get(SERVER)
        if (res.data.verified === true) {
          return
        } else {
          navigate('/login')
        }
      }
      verifyUser()
    } catch (error) {
      console.log(error)
    }

    checkUser()
  }, [navigate])

  const checkUser = async () => {
    try {
      const res = await axios.get(URI)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const searchAvailable = async (filter) => {
    try {
      const res = await axios.get(URI + `search/available?user=${filter}`)
      setAvailable(res.data.available)
    } catch (error) {
      console.log(error)
    }
  }

  const save = async (e) => {
    try {
      e.preventDefault()
      if (available === false) {
        document.getElementById('message').innerHTML = `El usuario ${user} ya existe`
        setTimeout(() => document.getElementById('message').innerHTML = '', 3000)
      } else if (user === '' || fullname === '' || password === '') {
        document.getElementById('message').innerHTML = 'Debe proporcionar todos los datos'
        setTimeout(() => document.getElementById('message').innerHTML = '', 3000)
      } else if (password !== vpassword) {
        document.getElementById('message').innerHTML = 'Las contraseñas no coinciden'
        setTimeout(() => document.getElementById('message').innerHTML = '', 3000)
      } else {
        await axios.post(URI, { user, password, fullname })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        isAdmin() ?
          <div className='createBox'>
            <div className='container createUser shadow-sm'>
              <h1 className='appTitle fw-bold mb-3'>Crear nuevo Usuario</h1>
              <p className='message' id='message' style={{ color: 'red' }}></p>
              <form onSubmit={save}>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
                  <input
                    className='form-control'
                    value={user}
                    onChange={(e) => setUser(e.target.value.toLowerCase())}
                    onKeyUp={(e) => searchAvailable(e.target.value.toLowerCase())}
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
                  <span className='input-group-text' id='inputPasswd'>Contraseña</span>
                  <input
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text' id='inputVPasswd'>Conf. Contraseña</span>
                  <input
                    className='form-control'
                    value={vpassword}
                    onChange={(e) => { setVPassword(e.target.value) }}
                    type='password'
                  />
                </div>

                <br />
                <div className='formButtons'>
                  <button
                    type='button' className='btn btn-secondary' onClick={() => { navigate('/') }}
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
          : <h3>{message}</h3>
      }

    </>
  )
}

export default CompCreateUser
