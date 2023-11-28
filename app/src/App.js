import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { SlLogout } from "react-icons/sl";
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import logo from '../src/images/squid.webp'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'
import axios from 'axios';
import { SERVER } from './components/ShowUsers.js';

// Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompPdf from './components/PrintPdf.js'
import CompPageNotFound from './components/PageNotFound.js'

function App() {

  // const getName = async () => {
  //   try {
  //     const regex = new RegExp(`(^| )token=([^;]+)`)
  //     const token = document.cookie.match(regex)[0].split('=')[1]

  //     const res = await axios.patch(`${SERVER}/logout`)
  //     // document.getElementById('userName').innerHTML = res.data.fullname
  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const delToken = () => {
    const res = axios.patch(`${SERVER}/logout`,)
  }

  const logOut = async () => {
    delToken()
    await axios.get(`${SERVER}/logout`)
    window.location.reload(true)
  }

  return (
    <div className='App'>
      <nav className="navbar border-bottom" style={{ backgroundColor: '#555' }}>
        <div className="container-fluid">
          <a className="App-Title navbar-brand"><span className='text fw-bold mb-2 text-uppercase'>Usuarios del proxy</span></a>
          <form className="d-inline-flex" role="search" id='logOut'>
            <span className='userName' id='userName'></span>
            {window.location.pathname === '/' ?
              < button className="btn" id='logOut' type="button" onClick={logOut}><SlLogout className='actionIcon' size='26px' color='chocolate' /></button>
              : ''
            }
          </form>
        </div>
      </nav >
      <br />

      <BrowserRouter basename='/' forceRefresh={true}>
        <Routes>
          <Route path='/' element={<CompShowUsers />} />
          <Route path='/login' element={<CompLogin />} />
          <Route path='/create' element={<CompCreateUser />} />
          <Route path='/edit/:id' element={<CompEditUser />} />
          <Route path='/pdf' Component={CompPdf} />
          <Route path='/error' Component={<CompPageNotFound />} />
        </Routes>
      </BrowserRouter>

    </div >
  )
}

export default App
