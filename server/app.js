import express from 'express'
import cors from 'cors'
import AppRoutes from './routes/routes.js'
import { searchUsers } from './controllers/UsersController.js'
import cookieParser from 'cookie-parser'
import { userLogin } from './controllers/LoginController.js'
import jwt from 'jsonwebtoken'

const app = express()

// Verify if user is autenticated
const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.send({ message: 'User not autenticated' })
  } else {
    const TOKEN_KEY = 'x4TvnErxRETbVcqaLl5dqMI115eN1p5y'
    jwt.verify(token, TOKEN_KEY, (error, decode) => {
      if (error) {
        return res.send({ message: 'Incorrect token' })
      } else {
        req.name = decode.name
        next()
      }
    })
  }
}

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./static'))
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['POST', 'GET', 'PATCH'],
  credentials: true
}))

// Login & Logout
app.post('/login', userLogin)
app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ Status: 'success' })
})

// Routes
app.use('/users/search', searchUsers)
app.use('/users', AppRoutes)
app.use('/error', (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})

app.use('/', verifyUser, (req, res) => {
  res.json({ Status: 'success' })
})

app.use((req, res) => {
  if (req.url === '/') {
    res.redirect('users')
  } else {
    res.redirect('error')
  }
})

export default app
