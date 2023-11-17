import { Sequelize } from 'sequelize'
import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USER } from '../config.js'

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
})

export default db
