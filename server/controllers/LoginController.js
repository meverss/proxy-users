import { db } from '../database/db.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import argon2 from 'argon2'

export const userLogin = async (req, res) => {
  const { user, password } = req.body
  const sha1 = crypto.createHash('sha1').update(password).digest('hex')

  try {
    const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND enabled = 1`)

    if (sql.length === 1) {
      const { id, fullname } = sql[0]
      const passwordHashed = sql[0].password

      // Verify credentials and create token //      
      const verifyPassword = await argon2.verify(passwordHashed, password)

      if (verifyPassword) {
        const TOKEN_KEY = process.env.SECRET
        const token = jwt.sign({ id, user, fullname }, TOKEN_KEY, { expiresIn: '1h' })

        res.json({ id: id, user: user, fullname: fullname, token })
      } else {
        res.status(401).json({
          message: 'Credenciales inválidas, intente de nuevo'
        })
      }
    } else {
      res.status(401).json({
        message: 'Usuario o contraseña incorrectos'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const addToken = (req, res) => {
  const { user } = req.body
  const token = req.cookies.token

  try {
    const [sql] = db.query(`UPDATE passwd SET token = '${token}' WHERE user = ?`, [user])
    if (sql.affectedRows >= 1) {
      res.json({ token: token })
      console.log({ token: token })
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
  const { id } = jwt.decode(token)

  try {
    const [sql] = await db.query(`UPDATE passwd SET token = NULL WHERE id = ${id}`)
    if (sql.affectedRows >= 1) {
      res.json({ message: 'Session closed' })
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