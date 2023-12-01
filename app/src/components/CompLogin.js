import axios from 'axios'
import { FaUser, FaUnlock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { SlUser, SlLock } from "react-icons/sl";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { SERVER } from './ShowUsers';

const URI = 'http://localhost:4000/login'

const CompLogin = () => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.defaults.withCredentials = true
    const verifyUser = async () => {
      const res = await axios.get(SERVER)
      if (res.data.verified === true) {
        navigate('/')
      }
    }
    verifyUser()
    focus()
    animForm()
  }, [navigate])

  const showPassword = () => {
    const pwd = document.getElementById('pwdInput')

    if (pwd.type === 'password') {
      pwd.type = 'text'
    } else {
      pwd.type = 'password'
    }
  }

  const animForm = () => {
    const form = document.getElementById('card')

    form.classList.add("animate__animated", "animate__bounceIn");
  }

  const handleSubmit = async (e) => {
    const userInput = document.getElementById('userInputMod')
    const pawdInput = document.getElementById('pwdInput')
    const subTitle = document.getElementById('subTitle')

    const cleanForm = () => {
      pawdInput.value = ''; userInput.value = ''
      setUser('')
      setPassword('')
      userInput.focus()
    }

    e.preventDefault()

    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(URI, { user: user, password: password })
      if (res.status !== 404) {
        cleanForm()
        if (res.data.user === 'admin') {
          navigate('/')
        } else {
            navigate(`/edit/${res.data.id}`)
        }
        window.location.reload(true)
      }
    } catch (error) {
      subTitle.innerHTML = `<span style="color: red">Usuario o contraseã incorrectos</span>`
      setTimeout(() => {
        subTitle.innerHTML = `Ingrese sus credenciales`
      }, 2000)
      cleanForm()
    }
  }

  const focus = () => {
    const userInput = document.getElementById('userInput')
    if (userInput) {
      userInput.focus()
      userInput.setAttribute('id', 'userInputMod')
      return
    }
  }

  return (
    <>

      < div className='App'>
        <section className='vh-100 mainContainer'>
          <div className='container h-100 loginBox'>
            <div className='card text-white' id='card' style={{ borderRadius: '1rem' }}>
              <div className='card-body text-center' >

                <form className='container' id='loginForm' onSubmit={handleSubmit}>

                  <h2 className='loginTitle fw-bold mb-2 text-uppercase'>Autenticación</h2>
                  <p className='subTitle' id="subTitle">Ingrese sus credenciales</p>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><SlUser className='formIcons' /></span>
                    <input type="text" className="form-control" id='userInput' name='userInput' placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" value={user}
                      onChange={(e) => { setUser(e.target.value.toLowerCase()) }} />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text"><SlLock className='formIcons' /></span>
                    <input type="password" className="form-control" id='pwdInput' name='pwdInput' placeholder='Contraseña' aria-label="Amount (to the nearest dollar)" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="input-group-text" id="showPwd" onClick={showPassword}><FaEye className='eye' /></span>
                  </div>

                  <button className='btn btn-success px-5' type='submit'>Login</button>

                </form>
              </div>
            </div>
          </div >
        </section >
      </div >
      {/* {focus()} */}
    </>
  )
}

export default CompLogin