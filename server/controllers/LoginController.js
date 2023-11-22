import { db } from '../database/db.js'
import { getDate } from "./UsersController.js"
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND password = '${sha1(password)}' AND enabled = 1`)

  console.log(req.body)
  if (sql != '') {

    // Create token
    const id = sql[0].id
    const userN = sql[0].user
    console.log(userN)
    const TOKEN_KEY = 'x4TvnErxRETbVcqaLl5dqMI115eN1p5y'  // This could be any string
    const token = jwt.sign({ userN }, TOKEN_KEY, { expiresIn: '1h' })
    res.cookie('token', token)
    res.json({ ...sql[0], lastlogin: getDate(), status: 'ok' })
  } else {
    res.status(404).json({
      message: 'Usuario o contraseña no incorrecta'
    })
  }
}
