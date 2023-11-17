import logo from './logo.svg'
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
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
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
