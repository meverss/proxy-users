import logo from '../src/images/squid.webp'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

// Import Components
import CompShowUsers from './components/ShowUsers.js'
import CompCreateUser from './components/CreateUser.js'
import CompEditUser from './components/EditUser.js'
import CompLogin from './components/CompLogin.js'

// Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompPdf from './components/PrintPdf.js'
import CompPageNotFound from './components/PageNotFound.js'

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
          <Route path='/' element={<CompLogin />} />
          <Route path='/users' element={<CompShowUsers />} />
          <Route path='/create' element={<CompCreateUser />} />
          <Route path='/edit/:id' element={<CompEditUser />} />
          <Route path='/pdf' Component={CompPdf} />
          <Route path='/error' Component={<CompPageNotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
