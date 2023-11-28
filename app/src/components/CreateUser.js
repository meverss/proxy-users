import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER } from './ShowUsers.js'

const URI = `${SERVER}/users/`

const CompCreateUser = () => {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [vpassword, setVPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      const verifyUser = async () => {
        const res = await axios.get(SERVER)
        if (res.data.Status === 'success') {
          setAuth(true)
          console.log(res.data)
          return
        } else {
          navigate('/login')
          window.location.reload(true)
        }
      }
      verifyUser()

    } catch (error) {
      console.log(error)
    }
  }, [])


  // Procedure to save User
  const save = async (e) => {
    try {
      e.preventDefault()
      if (user === '' || fullname === '' || password === '') {
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
        auth ?
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
                    type='button' className='btn btn-secondary' onClick={() => { navigate('/'); window.location.reload(true) }}
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
          : ''
      }

    </>
  )
}

export default CompCreateUser
