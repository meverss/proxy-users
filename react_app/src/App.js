import logo from '../src/images/squid.webp'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

// Import Components
import CompShowUsers from './proxy-users/ShowUsers.js'
import CompCreateUser from './proxy-users/CreateUser.js'
import CompEditUser from './proxy-users/EditUser.js'

// Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompPdf from './proxy-users/PrintPdf.js'

function App() {
  return (
    <div className='App'>
      <nav className='navbar bg-dark border-bottom border-body' data-bs-theme='dark'>
        <div className='container container-fluid titlebar'>
          <a className='navbar-brand' href='/'>
            <img src={logo} className='App-logo' alt='logo' />&nbsp;
            {/* Gestión de usuarios del proxy */}
          </a>
        </div>
      </nav>
      <br />
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<CompShowUsers />} />
          <Route path='/create' element={<CompCreateUser />} />
          <Route path='/edit/:id' element={<CompEditUser />} />
          <Route path='/pdf' Component={CompPdf} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
