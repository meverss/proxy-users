import { db } from '../database/db.js'
import { getDate } from "./UsersController.js"
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND enabled = 1`)
  const {id, fullname} = sql[0]
  const passwordHashed = bcrypt.hash(password, 10)

  if (sql != '') {
    // Create token
    const TOKEN_KEY = process.env.SECRET
    const token = jwt.sign({ id, user, fullname }, TOKEN_KEY, { expiresIn: '1h' })

    res.cookie('token', token)
    res.json({ user: user })
  } else {
    res.status(404).json({
      message: 'Usuario o contraseña no incorrecta'
    })
  }
}

export const addToken = (req, res) => {
  const { user } = req.body
  const token = req.cookies.token


  try {
    const [sql] = db.query(`UPDATE passwd SET token = '${token}' WHERE user = ?`, [user])
    if (sql.affectedRows >= 1) {
      res.json({ token: token })
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

export const deleteToken = async (req, res) => {
  const token = req.cookies.token
  const userToken = jwt.decode(token)

  try {
    const [sql] = await db.query(`UPDATE passwd SET token = NULL WHERE id = ?`, [userToken.id])
    if (sql.affectedRows >= 1) {
      res.json({ message: 'Session closed'})
    } else {
      console.log('User not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `DELETE TOKEN: Something went wrong: ${error}`
    })
  }
}