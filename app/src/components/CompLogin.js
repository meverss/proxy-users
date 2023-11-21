import axios from 'axios'
import { FaUser, FaUnlock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:4000/login'

const CompLogin = () => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [info, setInfo] = useState([])
  const navigate = useNavigate()

  const showPassword = () => {
    const pwd = document.getElementById('pwdInput')
    const showPwd = document.getElementById('showPwd')
    // const eye = document.getElementById('eye')

    if (pwd.type === 'password') {

      pwd.type = 'text'

      showPwd.innerHTML = "<FaEyeSlash className='formIcons eye' id='eye' />"
    } else {
      pwd.type = 'password'
      showPwd.innerHTML = `<FaEye className='formIcons eye' id='eye' />`
    }
  }

  const handleSubmit = async (e) => {
    const userInput = document.getElementById('userInput')
    const pawdInput = document.getElementById('pwdInput')
    const subTitle = document.getElementById('subTitle')

    e.preventDefault()
    try {
      const res = await axios.post(URI, { user: user, password: password })
      if (res.status !== 404) {
        pawdInput.value = ''; userInput.value = ''
        setUser('')
        setPassword('')
        setInfo(res.data)
        console.table(res.data)
        console.log(res.status)
      }
    } catch (error) {
      subTitle.innerHTML = `<span style="color: red">Usuario o contraseña incorrectos</span>`
      setTimeout(() => {
        subTitle.innerHTML = `Ingrese sus credenciales`
      }, 2000)
      pawdInput.value = ''; userInput.value = ''
      setUser('')
      setPassword('')
      userInput.focus()
    }
  }

  return (
    <>
      < div className='App' >
        <section className='vh-100 mainContainer'>
          <div className='container h-100 loginBox'>
            <div className='card text-white' style={{ borderRadius: '1rem' }}>
              <div className='card-body text-center'>

                <form className='container' id='loginForm' onSubmit={handleSubmit}>

                  <h2 className='loginTitle fw-bold mb-2 text-uppercase'>Autenticación</h2>
                  <p className='subTitle' id="subTitle">Ingrese sus credenciales</p>

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FaUser className='formIcons' /></span>
                    <input type="text" className="form-control" id='userInput' name='userInput' list="datalistOptions" placeholder="Usuario" aria-label="Username" aria-describedby="basic-addon1" value={user} onChange={(e) => setUser(e.target.value)} />
                    <datalist id="datalistOptions">
                      <option value="admin" />
                      <option value="marvin" />
                    </datalist>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text"><FaUnlock className='formIcons' /></span>
                    <input type="password" className="form-control" id='pwdInput' name='pwdInput' placeholder='Contraseña' aria-label="Amount (to the nearest dollar)" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="input-group-text" id="showPwd" onClick={showPassword}><FaEye className='formIcons eye' id='eye' /></span>
                  </div>

                  <button className='btn btn-success px-5' type='submit'>Login</button>

                </form>
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  )
}

export default CompLogin
