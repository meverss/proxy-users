import app from './app.js'
import { PORT } from './config.js'

// Settings
app.set('case sensitive routing', true)
app.set('appName', 'proxy-users')

// Run Server
app.listen(PORT, () => {
  console.log(`Server listenning on port ${PORT}...`)
})
