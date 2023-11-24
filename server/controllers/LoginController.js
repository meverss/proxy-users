import { db } from '../database/db.js'
import { getDate } from "./UsersController.js"
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'
import bcrypt, { hash } from 'bcrypt'

const salt = 10

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND password = '${sha1(password)}' AND enabled = 1`)

  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) { res.json({ message: 'Error hashing password' }) }
    // console.log(hash)
  })

  if (sql != '') {
    // Create token
    const TOKEN_KEY = 'x4TvnErxRETbVcqaLl5dqMI115eN1p5y'  // This could be any string
    const token = jwt.sign({ user }, TOKEN_KEY, { expiresIn: '1h' })

    res.cookie('token', token)
    res.json({ user: user })
  } else {
    res.status(404).json({
      message: 'Usuario o contraseña no incorrecta'
    })
  }
}

export const addToken = async (req, res) => {
  const { user } = req.body
  const token = req.cookies.token

  console.log(user)
  console.log(token)
  try {
    const [sql] = await db.query(`UPDATE passwd SET token = '${token}' WHERE user = ?`, [user])
    if (sql.affectedRows >= 1) {
      console.log(`Updated user ${user}`)
      res.json({token: token})
    } else {
      console.log('User not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `INSERT TOKEN: Something went wrong: ${error}`
    })
  }
}
