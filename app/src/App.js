import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import './animate.css'
import axios from 'axios';
import { SlLogout } from "react-icons/sl";
import { SERVER } from './components/ShowUsers.js';
import { useState, useEffect } from 'react';

// Import router
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import CompPdf from './components/PrintPdf.js'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'
import CompPageNotFound from './components/CompPageNotFound.js'

const URI = `${SERVER}/users/`

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
      window.location.pathname = '/'
      await axios.get(`${SERVER}/logout`)
    } catch (error) {
      console.log(error)
    }
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
                < button className="btn" id='btnLogOut' type="button" onClick={logOut}><SlLogout className='actionIcon' size='26px' color='chocolate' /></button>
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
