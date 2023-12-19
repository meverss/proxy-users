import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import 'bulma/css/bulma.css'
import './App.css'
import './animate.css'
import { SlLogout } from "react-icons/sl";
import { useState, useEffect } from 'react';

// Import router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import CompPdf from './components/PrintPdf.js'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'
import CompPageNotFound from './components/CompPageNotFound.js'

const App = () => {
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

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

  const runtest = () => {
    const modal = document.getElementById('message')
    modal.classList.add('is-active', 'is-clipped')
  }

  const closeMessage = () =>{
    const modal = document.getElementById('message')
    modal.classList.remove('is-active', 'is-clipped')
  }

  return (

    <>
      <div className='App'>
        <nav className="navbar border-bottom">
          <div className="container-fluid">
            <div className='Title'>
              <p className="App-Title "><span className='text fw-bold mb-2 text-uppercase'>Usuarios del proxy</span></p>
            </div>
            <div className="sessionInfo d-inline-flex" role="search" id='logOut'>

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
            <Route path='*' element={<Navigate to="/error" />} />

            <Route path='/pdf' Component={CompPdf} />
          </Routes>
        </BrowserRouter>

      </div >

    </>
  )
}

export default App
