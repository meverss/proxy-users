import { db } from '../database/db.js'
import { getDate } from "./UsersController.js"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import sha1 from 'sha1'

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  console.log(user, password)
  const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND password = '${sha1(password)}'`)
  if (sql != '') {
    res.json({ ...sql[0], lastlogin: getDate() })
  } else {
    res.status(404).json({
      message: 'Usuario o contraseña no incorrecta'
    })
  }
}
