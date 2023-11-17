import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import CompEdituser from './EditUser.js'

const PORT = 4000

const URI = `http://192.168.181.15:${PORT}/users/`
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
            <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
              <Link to='/create' className='new-record btn btn-outline-success  me-md-2'>Nuevo</Link>
            </div>
            <table className='table table-responsive table-sm table-hover'>
              <thead className='table-dark'>
                <tr>
                  <th scope='col'>Usuario</th>
                  <th scope='col'>Nombre y apellidos</th>
                  <th scope='col'>F. Creado</th>
                  <th scope='col'>F. Actualización</th>
                  <th scope='col'>Estado</th>
                  <th scope='col'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td> {user.user} </td>
                    <td> {user.fullname} </td>
                    <td> {user.createdAt} </td>
                    <td> {user.updatedAt} </td>
                    <td> {user.enabled === 1 ? 'Activado' : 'Desactivado'} </td>
                    <td className='actions'>
                      <Link to={`/edit/${user.id}`} className='btn btn-info'><i className='far fa-edit' /></Link>
                      <button className='btn btn-danger' onClick={() => deleteuser(user.id)}><i className='far fa-trash-can' /></button>
                    </td>
                    {/* <CompEdituser id={user.id} /> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompShowusers
