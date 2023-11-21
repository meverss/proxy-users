import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsJournalText, BsTrash, BsPersonFillAdd } from 'react-icons/bs'

const PORT = 4000
export const SERVER = `http://localhost:${PORT}`

const URI = `${SERVER}/users/`
const CompShowusers = () => {
  const [users, setusers] = useState([])
  useEffect(() => {
    getUsers()
  }, [])

  // Procedure to show all users
  const getUsers = async () => {
    const res = await axios.get(URI)
    setusers(res.data)
  }

  // Procedure to search users
  const filterUsers = async (filter) => {
    const res = await axios.get(URI + `search?user=${filter}`)
    setusers(res.data)
  }

  // Procedure to delete a user
  const deleteuser = async (id) => {
    await axios.delete(URI + id)
    getUsers()
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='appTitle'>Listado de usuarios</h1>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Buscar usuario</span>
              <input
                className='form-control'
                onChange={(e) => filterUsers(e.target.value)}
                type='text'
              />
            </div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Link to='/create' className='new-record btn btn-outline-secondary me-md-2' style={{ borderRadius: '8px' }}><BsPersonFillAdd size='20px' /> Nuevo usuario</Link>
            </div>
            <div className='usersTable'>
              <table className='table table-responsive table-sm table-hover'>
                <thead className='table-dark'>
                  <tr>
                    <th scope='col'>Usuario</th>
                    <th scope='col'>Nombre y apellidos</th>
                    <th scope='col'>Creado</th>
                    <th scope='col'>Modificdo</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className='table-sm'>
                      <td><p> {user.user}</p> </td>
                      <td><p> {user.fullname}</p> </td>
                      <td><p> {user.createdAt}</p> </td>
                      <td><p> {user.updatedAt} </p></td>
                      <td> <p>{user.enabled === 1 ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>} </p></td>
                      <td className='actions'>
                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-outline-secondary'><BsJournalText size='26px' /></Link>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => deleteuser(user.id)}><BsTrash size='24px' /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompShowusers
