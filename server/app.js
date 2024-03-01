import express from 'express'
import cors from 'cors'
import AppRoutes from './routes/routes.js'
import { userLogin } from './controllers/LoginController.js'
import { verifyUser } from './middlewares/verifyUser.js'
import jwt from 'jsonwebtoken'
import { SERVERIP } from './config.js'

const app = express()
const URI = `http://${SERVERIP}:3000`

console.log(URI)

app.disable('x-powered-by')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./static'))
app.use(cors({
  origin: ['http://localhost:3000', URI.toString],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}))

// Login
app.post('/login', userLogin)

// Routes
app.use('/users', verifyUser, AppRoutes)
app.use('/error', verifyUser, (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})

// Verify user
app.use('/', verifyUser, (req, res) => {
  const auth = (req.headers.authorization).split(' ')
  const token = auth[1]
  const { id, fullname } = jwt.decode(token)
  res.json({ verified: true, id: id, fullname: fullname, token: token })
})

app.use((req, res) => {
  if (req.url === '/') {
    res.redirect('users')
  } else {
    res.redirect('error')
  }
})

export default app