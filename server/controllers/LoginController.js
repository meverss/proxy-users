import { db } from '../database/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Verify if user is autenticated
export const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.send({ message: 'User not autenticated' })
  } else {
    const TOKEN_KEY = process.env.SECRET
    jwt.verify(token, TOKEN_KEY, (error, decode) => {
      if (error) {
        return res.send({ error })
      } else {
        req.user = decode.user
        next()
      }
    })
  }
}

export const userLogin = async (req, res) => {
  const { user, password } = req.body

  try {
    const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' AND enabled = 1`)

    if (sql.length === 1) {
      const { id, fullname } = sql[0]
      const passwordHashed = sql[0].password

      // Verify credentials and create token
      const verifyPassword = await bcrypt.compare(password, passwordHashed)

      if (verifyPassword) {
        const TOKEN_KEY = process.env.SECRET
        const token = jwt.sign({ id, user, fullname }, TOKEN_KEY, { expiresIn: '1h' })
        res.cookie('token', token)
        res.json({ user: user })
      } else {
        console.log(verifyPassword)
        res.status(404).json({
          message: 'Usuario o contraseña incorrectos'
        })
      }
    } else {
      res.status(404).json({
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