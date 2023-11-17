import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 80
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'marvin'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'mes2**'
export const DB_DATABASE = process.env.DB_DATABASE || 'database_app'
export const DB_PORT = process.env.DB_PORT = 3306

export const serverPort = PORT
