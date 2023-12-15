import { db } from '../database/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Verify if user is autenticated
export const verifyUser = (req, res, next) => {
  const auth = req.get('authorization')
  const token = (auth.split(' '))[1]

  if (!token) {
    res.send({ message: 'Usuario no autenticado' })
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

        res.json({ id: id, user: user, fullname: fullname, token: token })
      } else {
        res.status(401).json({
          message: 'Usuario o contraseña incorrectos'
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
  // handleCors(req, res)
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
  // handleCors(req, res)

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