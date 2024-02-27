import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import './animate.css'
import { SlLogout } from "react-icons/sl";
import { React, useState, useEffect, createContext } from 'react';
import background_app from './images/background_app.webp'

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

// App Component
const App = () => {
  const [user, setUser] = useState('')

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
            <br />
            <BrowserRouter forceRefresh={true}>
              <Routes>
                <Route path='/' element={<CompShowUsers getname={getName} />} />
                <Route path='/login' element={<CompLogin />} />
                <Route path='/create' element={<CompCreateUser getname={getName} />} />
                <Route path='/edit/:id' element={<CompEditUser getname={getName} />} />
                <Route path='/error' element={<CompPageNotFound getname={getName} />} />
                <Route path='/print' element={<CompPdf getname={getName} />} />
                <Route path='*' element={<Navigate to="/error" />} />

              </Routes>
            </BrowserRouter>
          </div>
        </div >
      </>
    </serverContext.Provider>
  )
}

export default App
