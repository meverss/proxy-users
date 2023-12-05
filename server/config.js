import { config } from 'dotenv'
import ip from 'ip'

config()

export const PORT = process.env.PORT || 4000
export const DB_HOST = process.env.DB_HOST || '192.168.219.14'
export const DB_USER = process.env.DB_USER || 'squidadmin'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'squidadmin'
export const DB_DATABASE = process.env.DB_DATABASE || 'squid'
export const DB_PORT = process.env.DB_PORT = 3306

export const serverPort = PORT
export const serverIP = ip.address()


