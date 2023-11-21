import { db } from '../database/db.js'
import { getDate } from "./UsersController.js"
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  console.log(user, password)
  const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND password = '${sha1(password)}' AND enabled = 1`)

  if (sql != '') {

    console.log(sql[0])
    // Create token
    const user = sql[0].user
    const TOKEN_KEY = 'x4TvnErxRETbVcqaLl5dqMI115eN1p5y'  // This could be any string
    const token = jwt.sign({ user }, TOKEN_KEY, { expiresIn: '1h' })
    res.cookie('token', token)
    res.json({ ...sql[0], lastlogin: getDate() })
  } else {
    res.status(404).json({
      message: 'Usuario o contraseña no incorrecta'
    })
  }
}
