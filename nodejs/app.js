import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import BlogRoutes from './routes/routes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('./static'))

// Routes
app.use('/blogs', BlogRoutes)
app.use('/error', (req, res) => {
  res.status(404).render('404error', { title: 'Error 404 - Page not found' })
})
app.use((req, res) => {
  if (req.url === '/') {
    res.redirect('blogs')
  } else {
    res.redirect('error')
  }
})

// Connect to Database
try {
  await db.authenticate()
  console.log('Connected to Database...')
} catch (error) {
  console.log('Unable to connect to database:', error)
}

export default app
