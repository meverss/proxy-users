import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SERVER } from './ShowUsers.js'
import { FaEye, FaEyeSlash } from "react-icons/fa6"

const URI = `${SERVER}/users/`

const CompEditUser = ({ getname }) => {
  const [user, setUser] = useState('')
  const [authUser, setAuthUser] = useState('')
  const [admin, setAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [vpassword, setVPassword] = useState('')
  const [viewpassword, setViewPassword] = useState(<FaEye className='eye' />)
  const [viewpassword2, setViewPassword2] = useState(<FaEye className='eye' />)
  const [fullname, setFullname] = useState('')
  const [enabled, setEnabled] = useState('')
  const navigate = useNavigate()

  const { id } = useParams()

  axios.defaults.withCredentials = true
  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      const verifyUser = async () => {
        const res = await axios.get(SERVER)
        if (res.data.verified === true) {
          if (res.data.id === 1) {
            setAdmin(true)
          }
          getname(res.data.fullname)
          return
        } else {
          navigate('/login')
        }
      }
      verifyUser()
      getUserById()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getUserById = async () => {

    const stateSwitch = document.getElementById('userState')
    const stateLabel = document.getElementById('userStateLabel')

    try {
      const res = await axios.get(URI + id)
      setUser(res.data.user)
      setAuthUser(res.data.authUser)
      setFullname(res.data.fullname)
      setEnabled(res.data.enabled)
      if (res.data.authUser === 'admin') {
        try {
          if (res.data.enabled === 1) {
            stateSwitch.checked = true
            stateLabel.innerHTML = 'Activo'
          } else {
            stateSwitch.checked = false
            stateLabel.innerHTML = 'Inactivo'
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      navigate(`/edit/${error.response.data.authId}`)
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

  const checkAdmin = () => {
    const enableSwitch = document.getElementById('userState')
    const enableSwitchLabel = document.getElementById('userStateLabel')
    const userInput = document.getElementById('userInput')
    const nameInput = document.getElementById('nameInput')
    try {
      if (user === 'admin') {
        enableSwitch.style.display = 'none'
        enableSwitchLabel.style.display = 'none'
        userInput.disabled = true
        nameInput.disabled = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = async () => {
    try {
      await axios.get(`${SERVER}/logout`)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (e) => {
    const message = document.getElementById('message')

    e.preventDefault()
    if (password !== vpassword) {
      document.getElementById('message').innerHTML = 'Las contraseñas no coinciden'
      setTimeout(() => message.innerHTML = `&nbsp;`, 3000)
    } else if (password === '' && vpassword === '') {
      await axios.patch(URI + id + '/nopwd', { user, fullname, enabled })
      authUser === 'admin' ? navigate('/') : logOut()
    } else if (password === vpassword) {
      await axios.patch(URI + id, { user, fullname, password, enabled })
      authUser === 'admin' ? navigate('/') : logOut()
    }
  }

  const showPassword = () => {
    const pwd = document.getElementById('pwdInput')
    if (pwd.type === 'password') {
      pwd.type = 'text'
      setViewPassword(<FaEyeSlash className='eye' />)
    } else {
      pwd.type = 'password'
      setViewPassword(<FaEye className='eye' />)
    }
  }

  const showVPassword = () => {
    const pwd = document.getElementById('pwdVInput')
    if (pwd.type === 'password') {
      pwd.type = 'text'
      setViewPassword2(<FaEyeSlash className='eye' />)
    } else {
      pwd.type = 'password'
      setViewPassword2(<FaEye className='eye' />)
    }
  }

  return (
    <>
      <div className='editBox '>
        <div className='container editUser shadow-sm'>
          <h1 className='sessionTitle fw-bold mb-3'>Editar los datos de </h1>
          <h1 className='sessionTitle fw-bold mb-3'>{fullname}</h1>
          <p className='message' id='message' style={{ color: 'red' }}>&nbsp;</p>
          <form onSubmit={updateUser}>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
              <input
                id='userInput'
                className='form-control'
                placeholder={user}
                onChange={(e) => setUser(e.target.value)}
                type='text'
                disabled={admin ? false : true}
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
              <input
                id='nameInput'
                className='form-control'
                placeholder={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type='text'
                disabled={admin ? false : true}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña</span>
              <input id='pwdInput' name='pwdInput'
                type="password"
                className="form-control"
                placeholder='********'
                onChange={(e) => setPassword(e.target.value)} />
              <span className="input-group-text" id="showPwd" onClick={showPassword}>{viewpassword}</span>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text"> Verificación</span>
              <input id='pwdVInput' name='pwdVInput'
                type="password"
                className="form-control"
                placeholder='********'
                onChange={(e) => setVPassword(e.target.value)} />
              <span className="input-group-text" id="showPwd" onClick={showVPassword}>{viewpassword2}</span>
            </div>
            <div className='form-switch' >
              <input className='form-check-input' id='userState' name='userState' type='checkbox' role='switch' onLoad={checkAdmin()} onChange={checkState} disabled={admin ? false : true} /> &nbsp;
              <label className='form-check-label' id='userStateLabel' htmlFor='userState' />
            </div>
            <br />
            <div className='formButtons'>
              <button
                type='button' className='btn btn-secondary' onClick={admin ? () => navigate('/') : logOut}
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
