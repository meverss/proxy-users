import logo from '../src/images/squid.webp'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Link } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { useState, useEffect } from 'react';

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

  const lob = document.getElementById('logOut')
  console.log(lob)
  // if(document.getElementById('')){

  // }else{

  // }

  const [isLogin, setIsLogin] = useState(true)
  useEffect(()=>{
    if(isLogin === true) console.log(document.getElementById('logOut'))
    setIsLogin(false)
  })
  
  const logOut = async () => {
    await axios.get(`${SERVER}/logout`)
    window.location.reload(true)
  }

  return (
    <div className='App'>
      <nav className="navbar border-bottom" style={{ backgroundColor: '#555' }}>
        <div className="container-fluid">
          <a className="navbar-brand">Usuarios del proxy</a>
          <form className="d-flex" role="search">
            {window.location.pathname === '/login' ? '' :
              < button className="btn btn-outline-success" id='logOut' type="button" onClick={logOut}>Logout</button>
            }
          </form>
        </div>
      </nav >
      <br />

      <BrowserRouter forceRefresh={true}>
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
