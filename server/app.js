import express from 'express'
import cors from 'cors'
import AppRoutes from './routes/routes.js'
import { searchUsers, getUserName } from './controllers/UsersController.js'
import cookieParser from 'cookie-parser'
import { addToken, deleteToken, userLogin } from './controllers/LoginController.js'
import jwt from 'jsonwebtoken'

const app = express()

// Verify if user is autenticated
export const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.send({ message: 'User not autenticated' })
  } else {
    const TOKEN_KEY = process.env.SECRET
    jwt.verify(token, TOKEN_KEY, (error, decode) => {
      if (error) {
        return res.send({ error })
        // return res.send({ message: 'Incorrect token' })
      } else {
        req.user = decode.user
        // console.log(token)
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
  origin: ['http://localhost:3000', 'http://localhost:4000', 'http://192.168.228.14:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}))

// Login & Logout
app.post('/login', userLogin)
app.patch('/logout', deleteToken)
app.patch('/login/tokenize', addToken)
app.get('/logout', (req, res) => {
  res.clearCookie('token')
  // res.clearCookie('user')
  res.json({ Status: 'success' })
})


// Routes
app.use('/users', verifyUser, AppRoutes)
app.get('/users/whoami', verifyUser, getUserName)
app.use('/users/search', verifyUser, searchUsers)
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