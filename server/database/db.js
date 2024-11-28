import { createPool } from 'mysql2/promise'
import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js'

export const db = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
})

import mongoose from "mongoose"

export const connectDB = async () => {
try {
    await mongoose.connect("mongodb://localhost/squidusers")
    console.log(">> Connected to DB...")
}catch (error){
    console.log(error)
}
}