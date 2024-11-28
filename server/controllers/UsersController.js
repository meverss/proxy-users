import { db } from '../database/db.js'
import argon2 from 'argon2'
import crypto from "crypto"
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

// SETTING CUSTOM DATE
export const getDate = () => {
  const timestamp = Date.now()
  const today = new Date(timestamp)
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1 // Months start at 0!
  let dd = today.getDate() // prints the day of the month (1-31)
  let hh = today.getHours() // prints the hour (0-23)
  let min = today.getMinutes() // prints the minute (0-59)
  let sec = today.getSeconds() // prints the second (0-59)
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  if (hh < 10) hh = '0' + hh
  if (min < 10) min = '0' + min
  if (sec < 10) sec = '0' + sec

  return dd + '-' + mm + '-' + yyyy + '.' + hh + ':' + min + ':' + sec
}

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Users
export const getAllUsers = async (req, res) => {
  if (passAuth(req)) {
    const auth = req.get('authorization')
    const token = (auth.split(' '))[1]
    const { id } = jwt.decode(token)
    try {
      const [sql] = await db.query('SELECT * FROM passwd ORDER BY user')
      if (id === '5MWtG6KkG4GPO-unt12kj') {
        res.json(sql)
      } else {
        res.status(401).json({ message: 'Usuario no autorizado' })
      }
    } catch (error) {
      return res.status(500).json({
        message: `ALL USERS: Something went wrong: ${error}`
      })
    }
  } else {
    res.status(401).json({ message: 'Token incorrecto' })
  }
}

// Get One User
export const getOneUser = async (req, res) => {
  const { id } = req.params
  try {
    const auth = (req.headers.authorization).split(' ')
    const token = auth[1]

    const getAuthUser = jwt.decode(token)
    const authId = getAuthUser.id
    const authUser = getAuthUser.user

    const [sql] = await db.query(`SELECT * FROM passwd WHERE id = '${id}'`)
    if (authUser != 'admin' && authId != id) {
      res.status(401).json({ message: 'Unauthorized user', authUser, authId })
    } else {
      if (sql != '') {
        res.json({ ...sql[0], authUser, authId })
      } else {
        console.log('Record not found')
        res.status(404).json({
          message: 'Record not found'
        })
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: `ONE USER: Something went wrong: ${error}`
    })
  }
}

// Get User Name
export const getUserName = async (req, res) => {
  const auth = (req.headers.authorization).split(' ')
  const token = auth[1]

  const { id, user, fullname } = (jwt.decode(token))
  res.json({ id: id, user: user, fullname: fullname })
}

// Create a User
export const createUser = async (req, res) => {
  const { user, password, fullname } = req.body
  const auth = (req.headers.authorization).split(' ')
  const token = auth[1]
  const { id } = jwt.decode(token)
  const passwordHashed = await argon2.hash(password, {type: argon2.argon2id})

  try {
    if (id === '5MWtG6KkG4GPO-unt12kj') {
      const userID = nanoid()
      const [sql] = await db.query(`INSERT INTO passwd (id, user, password, fullname, createdAt, updatedAt) VALUES ('${userID}', '${user}', '${passwordHashed}', '${fullname}', '${getDate()}', '${getDate()}')`)
      if (sql.insertId >= 0) {
        console.log(`Added new user ${fullname}`)
        res.sendStatus(204)
      } else {
        console.log('No records added')
        res.sendStatus(501)
      }
    } else {
      res.status(401).json({ message: 'Usuario no autorizado' })
      console.log(id)
    }
  } catch (error) {
    return res.status(500).json({
      message: `CREATE USER: Something went wrong: ${error}`
    })
  }
}


// Update a User (ALL)
export const updateUser = async (req, res) => {
  const { user, password, enabled, fullname } = req.body
  const passwordHashed = await argon2.hash(password, {type: argon2.argon2id})
  const { id } = req.params

  try {
    const [sql] = await db.query(`UPDATE passwd SET user = IFNULL(?, user), fullname = IFNULL(?, fullname), password = IFNULL(?, password), enabled = IFNULL(?, enabled), updatedAt = '${getDate()}' WHERE id = '${id}'`, [user, fullname, passwordHashed, enabled])
    if (sql.affectedRows >= 1) {
      console.log(`Updated user ${fullname}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE USER: Something went wrong: ${error}`
    })
  }
}

// Update a User (No-Password)
export const updateUserNoPass = async (req, res) => {
  const { user, enabled, fullname } = req.body
  const { id } = req.params

  try {
    const [sql] = await db.query(`UPDATE passwd SET user = IFNULL(?, user), fullname = IFNULL(?, fullname), enabled = IFNULL(?, enabled), updatedAt = '${getDate()}' WHERE id = '${id}'`, [user, fullname, enabled])
    if (sql.affectedRows >= 1) {
      console.log(`Updated user ${fullname}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE USER: Something went wrong: ${error}`
    })
  }
}

// Delete a User
export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const [user] = await db.query(`SELECT (fullname) FROM passwd WHERE id = '${id}'`)
    const [sql] = await db.query(`DELETE FROM passwd WHERE id = '${id}'`)
    if (sql.affectedRows >= 1) {
      console.log(`User ${user[0].fullname} has been deleted`)
      res.sendStatus(204)
    } else {
      console.log('No records found')
      res.status(404).send('No records found')
    }
  } catch (error) {
    return res.status(500).json({
      message: `DELETE USER: Something went wrong: ${error}`
    })
  }
}

// Filter Users
export const searchUsers = async (req, res) => {
  try {
    const { user } = req.query
    const [sql] = await db.query(`SELECT id, user, fullname, createdAt, updatedAt, enabled FROM passwd WHERE user like '%${user}%' OR fullname like '%${user}%' ORDER by user`)
    res.json(sql)
  } catch (error) {
    return res.status(500).json({
      message: `SEARCH USER: Something went wrong: ${error}`
    })
  }
}

// Search if the New User is available
export const searchAvailableUser = async (req, res) => {
  try {
    const { user } = req.query
    const [sql] = await db.query(`SELECT user FROM passwd WHERE user = '${user}'`)
    if (sql.length === 0) {
      res.send({ available: true })
    } else {
      res.send({ available: false })
    }
  } catch (error) {
    res.send(req.query)
    return res.status(500).json({
      message: `SEARCH USER: Something went wrong: ${error}`
    })
  }
}