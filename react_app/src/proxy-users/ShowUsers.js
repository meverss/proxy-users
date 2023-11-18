import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PORT = 4000

const URI = `http://localhost:${PORT}/users/`
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
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Link to='/create' className='new-record btn btn-outline-primary me-md-2' style={{ borderRadius: '8px' }}><i className='fas fa-user-plus' /></Link>
            </div>
            <div className='usersTable'>
              <table className='table table-responsive table-sm table-hover'>
                <thead className='table-dark'>
                  <tr>
                    <th scope='col'>Acciones</th>
                    <th scope='col'>Usuario</th>
                    <th scope='col'>Nombre y apellidos</th>
                    <th scope='col'>Creado</th>
                    <th scope='col'>Modificdo</th>
                    <th scope='col'>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className='table-sm'>
                      <td className='actions'>
                        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-outline-info'><i className='fas fa-user-pen' /></Link>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => deleteuser(user.id)}><i className='far fa-trash-can' /></button>
                      </td>
                      <td><p> {user.user}</p> </td>
                      <td><p> {user.fullname}</p> </td>
                      <td><p> {user.createdAt}</p> </td>
                      <td><p> {user.updatedAt} </p></td>
                      <td> <p>{user.enabled === 1 ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Desactivado</span>} </p></td>
                      {/* <CompEdituser id={user.id} /> */}
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
