import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { ValidateAll } from './Validators.js';
import { serverContext } from '../App';

const token = localStorage.getItem("token")

const CompEditUser = ({ getname }) => {
  
  const server = useContext(serverContext)
  const URI = `${server}/users/`

  const [user, setUser] = useState('')
  const [seluser, setSelUser] = useState('')
  const [selfullname, setSelFullName] = useState('')
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
  const message = document.getElementById('message')
  const pwdInput = document.getElementById('pwdInput')
  const pwdVInput = document.getElementById('pwdVInput')

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.withCredentials = true

  useEffect(() => {
    try {
      const verifyUser = async () => {
        const res = await axios.get(`${server}`)
        if (res.data.verified === true) {
          if (res.data.id === '5MWtG6KkG4GPO-unt12kj') {
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
      setSelUser(res.data.user)
      setAuthUser(res.data.authUser)
      setFullname(res.data.fullname)
      setSelFullName(res.data.fullname)
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

  // Validate data
  ValidateAll('.form-control', seluser, selfullname)

  // Clear unsafe passwords
  if (pwdInput && pwdVInput) {
    const pwdFields = document.querySelectorAll('.pwdfield')

    pwdFields.forEach(field => {
      switch (field.id) {
        case 'pwdInput':
          field.addEventListener('focusout', (e) => {
            if (e.target.value === '') setPassword('')
          })
          break
        case 'pwdVInput':
          field.addEventListener('focusout', (e) => {
            if (e.target.value === '') setVPassword('')
          })
          break
        default:
      }
    })
  }

  const updateUser = async (e) => {
    e.preventDefault()

    if (password !== vpassword) {
      document.getElementById('message').innerHTML = 'Las contraseñas no coinciden'
      pwdInput.value = ''
      pwdVInput.value = ''
      setTimeout(() => message.innerHTML = `&nbsp;`, 3000)
      pwdInput.focus()
    } else if (password === '' && vpassword === '') {
      await axios.patch(URI + id + '/nopwd', { user, fullname, enabled })
      authUser === 'admin' ? navigate('/') : logOut()
    } else if (password === vpassword) {
      await axios.patch(URI + id, { user, fullname, password, enabled })
      authUser === 'admin' ? navigate('/') : logOut()
    }
  }

  const logOut = async () => {
    try {
      localStorage.removeItem('token')
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='editBox '>
        <div className='container editUser shadow-sm'>
          <h1 className='sessionTitle fw-bold mb-3'>{admin & seluser !== 'admin' ? 'Editar datos del usuario' : 'Cambiar contraseña'}</h1>
          <p className='message' id='message' style={{ color: 'red' }}>&nbsp;</p>
          <form id='editUser' onSubmit={updateUser}>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Usuario</span>
              <input
                id='userInput'
                name='user'
                className='form-control'
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type='text'
                disabled={admin ? false : true}
                data-frminfo='user'
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Nombre y Apellidos</span>
              <input
                id='nameInput'
                className='form-control'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type='text'
                disabled={admin ? false : true}
                data-frminfo='fullname'
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña</span>
              <input id='pwdInput' name='pwdInput'
                type="password"
                data-frminfo='password'
                className="form-control pwdfield"
                placeholder='********'
                onChange={(e) => setPassword(e.target.value)} />
              <span className="input-group-text" id="showPwd" onClick={showPassword}>{viewpassword}</span>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text"> Confirmar&nbsp;</span>
              <input id='pwdVInput' name='pwdVInput'
                type="password"
                data-frminfo='password'
                className="form-control pwdfield"
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
                type='button' id='btnCancel' className='btn btn-secondary' onClick={admin ? () => navigate('/') : logOut}
              >
                Cancelar
              </button>
              <button type='submit' id='btnSave' className='btn btn-success'>
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
