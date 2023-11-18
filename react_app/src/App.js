// import logo from './logo.svg'
import logo from '../src/images/squid.webp'
import './fontawesome/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

// Import Components
import CompShowUsers from './proxy-users/ShowUsers.js'
import CompCreateUser from './proxy-users/CreateUser.js'
import CompEditUser from './proxy-users/EditUser.js'

// Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompPdf from './proxy-users/PrintPdf.js'
// import CompPageNotFound from './User/PageNotFound.js'

function App() {
  return (
    <div className='App'>
      <nav className='navbar bg-dark border-bottom border-body' data-bs-theme='dark'>
        <div className='container container-fluid titlebar'>
          <a className='navbar-brand' href='/'>
            <img src={logo} className='App-logo' alt='logo' />&nbsp;
          </a>
          <form className='d-flex' role='search'>
            <input className='form-control me-2' type='search' placeholder='Usuario' aria-label='Search' />
            <button className='btn btn-outline-info' type='submit'>Buscar</button>
          </form>
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
