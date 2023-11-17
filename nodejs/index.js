import app from './app.js'
import { PORT } from './config.js'
import 'ejs'

// Settings
app.set('case sensitive routing', true)
app.set('appName', 'CRUD_MERN')
app.set('view engine', 'ejs')
app.set('views', './views')

// Server
app.listen(PORT, () => {
  console.log(`Server listenning on port ${PORT}...`)
  // console.log()
})
