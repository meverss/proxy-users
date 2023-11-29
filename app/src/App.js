import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import axios from 'axios';
import { SlLogout } from "react-icons/sl";
import { SERVER } from './components/ShowUsers.js';
import { useState, useEffect } from 'react';
import { SlUser } from "react-icons/sl"

// Import router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import CompPdf from './components/PrintPdf.js'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'
import CompPageNotFound from './components/PageNotFound.js'

const URI = `${SERVER}/users/`

function App() {

  useEffect(() => {
    getName()

  })

  const getName = async () => {
    try {
      const res = await axios.get(URI + 'whoami')
      const userNameTag = document.getElementById('userName')
      if (userNameTag && window.location.pathname !== '/login') {
        userNameTag.innerHTML = res.data.fullname
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const delToken = () => {
    const res = axios.patch(`${SERVER}/logout`,)
  }

  const logOut = async () => {
    try {
      delToken()
      await axios.get(`${SERVER}/logout`)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='App'>
      <nav className="navbar border-bottom" style={{ backgroundColor: '#555' }}>
        <div className="container-fluid">
          <a className="App-Title navbar-brand"><span className='text fw-bold mb-2 text-uppercase'>Usuarios del proxy</span></a>
          <div className="sessionInfo d-inline-flex" role="search" id='logOut'>
            <span className='userName' id='userName'></span>
            {window.location.pathname !== '/login' ?
              < button className="btn" id='btnLogOut' type="button" onClick={logOut}><SlLogout className='actionIcon' size='26px' color='chocolate' /></button>
              : ''
            }
          </div>
        </div>
      </nav >
      <br />

      <BrowserRouter basename='/' forceRefresh={true}>
        <Routes>
          {/* Elements */}
          <Route path='/' element={<CompShowUsers />} />
          <Route path='/login' element={<CompLogin />} />
          <Route path='/create' element={<CompCreateUser />} />
          <Route path='/edit/:id' element={<CompEditUser />} />
          <Route path='/error' element={<CompPageNotFound />} />
          <Route path='*' element={<Navigate to="/" />} />

          {/* Cmponents */}
          <Route path='/pdf' Component={CompPdf} />
        </Routes>
      </BrowserRouter>

    </div >
  )
}

export default App
