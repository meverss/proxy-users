import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import './animate.css'
import { SlLogout } from "react-icons/sl";
import { React, useState, useEffect, createContext } from 'react';
import background_app from './images/background_app.webp'
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6";


// Import router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'
import CompPageNotFound from './components/CompPageNotFound.js'
import CompPdf from './components/CompPDF.js'

// Set backend server
export const serverContext = createContext()
const server = `http://${window.location.hostname}:4000`

const timestamp = Date.now()
const today = new Date(timestamp)
const currentYear = today.getFullYear()

// App Component
const App = () => {
  const [user, setUser] = useState('')
  const [notifyIcon, setNotifyIcon] = useState()
  const [notifyText, setNotifyText] = useState()

  useEffect(() => {
    getName()
  }, [])

  const getName = (name) => {
    setUser(name)
  }

  const logOut = async () => {
    try {
      localStorage.removeItem('token')
      window.location.pathname = '/login'
    } catch (error) {
      console.log(error)
    }
  }

  // Notification Box

  const showNotification = (notiType, message) => {
    const noti = document.getElementById('s_notifications')

    switch (notiType) {
      case "ok":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon">
            <FaCircleCheck style={{ color: 'green' }} />
          </div>
        )
        break
      case "err":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon" >
            <FaTriangleExclamation style={{ color: 'red' }} />
          </div>
        )
        break
      case "inf":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon">
            <FaCircleExclamation style={{ color: 'yellow' }} />
          </div>
        )
        break
      default:
    }

    setNotifyText(message)
    noti.style['transform'] = 'translate(-3%)';
    setTimeout(() => {
      noti.style['transform'] = 'translate(102%)';
    }, 3500);

  }

  return (
    <serverContext.Provider value={server}>
      <>
        <div style={{
          backgroundImage: `url(${background_app})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundAttachment: 'fixed',
        }}>
          <div className='App' >
            <nav className="navbar">
              <div className="container-fluid">
                <div className='Title'>
                  <p className="App-Title "><span className='text fw-bold mb-2 text-uppercase'>Usuarios del proxy</span></p>
                </div>
                <div className="sessionInfo d-inline-flex" id='logOut'>

                  <span className='userName' id='userName'>{user}</span>
                  {user !== undefined ?
                    < button className="btn" id='btnLogOut' type="button" onClick={logOut}><SlLogout className='logOut actionIcon' size='26px' color='chocolate' /></button>
                    : null
                  }
                </div>
              </div>
            </nav >

            {/* Notification */}
            <section className="s_notifications" id="s_notifications">
              <div className="ntf_box" id="ntf_box">
                <div className="ntf_msg" id="ntf_msg">
                  <div className="ntf_icon">{notifyIcon}</div>
                  <div className="ntf_text">
                    {notifyText}
                  </div>
                </div>
              </div>
            </section>
            <br />
            <BrowserRouter forceRefresh={true}>
              <Routes>
                <Route path='/' element={<CompShowUsers
                  getname={getName} notify={showNotification} />} />
                <Route path='/login' element={<CompLogin />} notify={showNotification} />
                <Route path='/create' element={<CompCreateUser getname={getName} notify={showNotification} />} />
                <Route path='/edit/:id' element={<CompEditUser getname={getName} notify={showNotification} />} />
                <Route path='/error' element={<CompPageNotFound getname={getName} />} />
                <Route path='/print' element={<CompPdf getname={getName} />} />
                <Route path='*' element={<Navigate to="/error" />} />

              </Routes>
            </BrowserRouter>

          </div>
        </div >
        <div className='footer1'>
          <p>Usuarios del Proxy - Copyright© {currentYear}</p>
        </div>
      </>
    </serverContext.Provider>
  )
}

export default App