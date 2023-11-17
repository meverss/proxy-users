import logo from './logo.svg'
import './fontawesome/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

// Import Components
import CompShowBlogs from './blog/ShowBlogs.js'
import CompCreateBlog from './blog/CreateBlog.js'
import CompEditBlog from './blog/EditBlog.js'

// Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompPdf from './blog/PrintPdf.js'
// import CompPageNotFound from './blog/PageNotFound.js'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <br />
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<CompShowBlogs />} />
          <Route path='/create' element={<CompCreateBlog />} />
          <Route path='/edit/:id' element={<CompEditBlog />} />
          <Route path='/pdf' Component={CompPdf} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
