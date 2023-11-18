import { db } from '../database/db.js'

// SETTING CUSTOM DATE

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

export const getAllUsers = async (req, res) => {
  try {
    const [sql] = await db.query('SELECT * FROM passwd')
    res.json(sql)
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}

export const getOneUser = async (req, res) => {
  const { id } = req.params

  try {
    const [sql] = await db.query(`SELECT * FROM passwd WHERE id = ${id}`)
    if (sql != '') {
      res.json(sql[0])
    } else {
      console.log('Record not found')
      res.status(404).json({
        message: 'Record not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}

export const createUser = async (req, res) => {
  const { user, password, fullname } = req.body
  const customDate = dd + '-' + mm + '-' + yyyy + '.' + hh + ':' + min + ':' + sec

  try {
    const [sql] = await db.query(`INSERT INTO passwd (user, password, fullname, createdAt, updatedAt) VALUES ('${user}', SHA1('${password}'), '${fullname}', '${customDate}', '${customDate}')`)
    if (sql.insertId >= 0) {
      console.log(`Added new user ${fullname}`)
      res.sendStatus(204)
    } else {
      console.log('No records added')
      res.sendStatus(501)
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}

export const updateUser = async (req, res) => {
  const { user, password, enabled, fullname } = req.body
  const { id } = req.params
  const customDate = dd + '-' + mm + '-' + yyyy + '.' + hh + ':' + min + ':' + sec

  try {
    const [sql] = await db.query(`UPDATE passwd SET user = IFNULL(?, user), password = IFNULL(SHA1(?), password), enabled = IFNULL(?, enabled), fullname = IFNULL(?, fullname), updatedAt = '${customDate}' WHERE id = ${id}`, [user, password, enabled, fullname])
    if (sql.affectedRows >= 1) {
      console.log(`Updated user ${user}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const [user] = await db.query(`SELECT (fullname) FROM passwd WHERE id = ${id}`)
    const [sql] = await db.query(`DELETE FROM passwd WHERE id = ${id}`)
    if (sql.affectedRows >= 1) {
      console.log(`${user[0].fullname} has been deleted from Squid users`)
      res.sendStatus(204)
    } else {
      console.log('No records found')
      res.status(404).send('No records found')
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}

export const searchUsers = async (req, res) => {
  try {
    const user = req.params
    const [sql] = await db.query(`SELECT * FROM passwd WHERE user = '${user}' OR fullname like '%${user}%'`)
    res.json(sql)
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error}`
    })
  }
}
