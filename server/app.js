import express from 'express'
import cors from 'cors'
import AppRoutes from './routes/routes.js'
import cookieParser from 'cookie-parser'
import { verifyUser, userLogin } from './controllers/LoginController.js'
import jwt from 'jsonwebtoken'

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./static'))
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000', 'http://192.168.228.14:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}))

// Login & Logout
app.post('/login', userLogin)
app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ Status: 'success' })
})

// Routes
app.use('/users', verifyUser, AppRoutes)

app.use('/error', (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})

// Verify user session
app.use('/', verifyUser, (req, res) => {
  const { token } = req.cookies
  const { id, fullname } = jwt.decode(token)
  res.json({ verified: true, id: id, fullname: fullname })
})

app.use((req, res) => {
  if (req.url === '/') {
    res.redirect('users')
  } else {
    res.redirect('error')
  }
})

export default app