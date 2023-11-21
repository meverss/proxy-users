import express from 'express'
import cors from 'cors'
import AppRoutes from './routes/routes.js'
import { searchUsers } from './controllers/UsersController.js'
import cookieParser from 'cookie-parser'
import { userLogin } from './controllers/LoginController.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
// app.use(cookieParser)
app.use(express.static('./static'))

// Login
app.post('/login', userLogin)

// Routes
app.use('/users/search', searchUsers)
app.use('/users', AppRoutes)

app.use('/error', (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})

app.use((req, res) => {
  if (req.url === '/') {
    res.redirect('users')
  } else {
    res.redirect('error')
  }
})

export default app
