// import { pool } from '../database/db.js'
import { pool } from '../database/db.js'

export const getAllUsers = async (req, res) => {
  try {
    const [sql] = await pool.query('SELECT * FROM passwd')
    res.json(sql)
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const getOneUser = async (req, res) => {
  const { id } = req.params

  try {
    const [sql] = await pool.query(`SELECT * FROM passwd WHERE id = ${id}`)
    if (sql !== '') {
      res.json(sql[0])
    } else {
      console.log('Record not found')
      res.status(404).json({
        message: 'Record not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const createUser = async (req, res) => {
  const { name, salary } = req.body

  try {
    const [sql] = await pool.query(`INSERT INTO passwd (name, salary) VALUES ('${name}', ${salary})`)
    if (sql.insertId >= 0) {
      console.log(`Added new employee ${name} with a salary of $${salary}`)
      res.sendStatus(204)
    } else {
      console.log('No records added')
      res.sendStatus(501)
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const updateUser = async (req, res) => {
  const { name, salary } = req.body
  const { id } = req.params

  try {
    const [sql] = await pool.query(`UPDATE passwd SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ${id}`, [name, salary])
    if (sql.affectedRows >= 1) {
      console.log('Updated info')
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const [db] = await pool.query('SELECT * FROM passwd')
    const [employee] = await pool.query(`SELECT (name) FROM passwd WHERE id = ${id}`)
    const [sql] = await pool.query(`DELETE FROM passwd WHERE id = ${id}`)
    if (sql.affectedRows >= 1) {
      console.log(`${employee[0].name} has been deleted from passwd`)
      res.send(db)
    } else {
      console.log('No records found')
      res.status(404).send('No records found')
    }
  } catch {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}
