import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsJournalText, BsTrash } from 'react-icons/bs'
import { SlUserFollow, SlMagnifier } from "react-icons/sl";

const PORT = 4000
export const SERVER = `http://localhost:${PORT}`
const URI = `${SERVER}/users/`

export const isAdmin = () => {
  const userFullname = document.getElementById('userName')
  if (userFullname && userFullname.innerHTML === 'Administrador') {
    return true
  }
}

const CompShowusers = () => {
  const [users, setusers] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {

    axios.defaults.withCredentials = true
    const verifyUser = async () => {
      const res = await axios.get(SERVER)
      if (res.data.verified === true) {
        return
      } else {
        navigate('/login')
      }
    }
    verifyUser()
    getUsers()
  }, [navigate])

  const getUsers = async () => {
    try {
      const res = await axios.get(URI)
      setusers(res.data)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const filterUsers = async (filter) => {
    try {
      const res = await axios.get(URI + `search?user=${filter}`)
      setusers(res.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const deleteuser = async (id) => {
    await axios.delete(URI + id)
    getUsers()
  }

  return (
    <>
      {
        isAdmin() ?
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <h1 className='appTitle fw-bold mb-3'>Listado de usuarios</h1>
                <div className='input-group mb-3 shadow-sm'>
                  <span className='input-group-text ' id='basic-addon1'><SlMagnifier /></span>
                  <input
                    className='form-control'
                    onChange={(e) => filterUsers(e.target.value)}
                    type='text'
                  />
                </div>
                <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
                  <Link to='/create' className='new-record btn btn-outline-secondary me-md-2 shadow-sm border-dark-subtle' style={{ borderRadius: '8px' }}><SlUserFollow size='22px' /> Nuevo</Link>
                </div>
                <div className='usersTable shadow-sm p-3 mb-5 '>
                  <table className='table table-responsive table-sm table-hover'>
                    <thead className='table' style={{ backgroundColor: '#000' }}>
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
                          <td><p id='admUser'> {user.user}</p> </td>
                          <td><p> {user.fullname}</p> </td>
                          <td><p> {user.createdAt}</p> </td>
                          <td><p> {user.updatedAt} </p></td>
                          <td> <p>{user.enabled === 1 ? <span style={{ color: 'green' }}>Activo</span> : <span style={{ color: 'red' }}>Inactivo</span>} </p></td>
                          <td className='actions'>
                            <Link to={`/edit/${user.id}`} className='btn btn-sm ' id='editIcon'><BsJournalText className='actionIcon' size='26px' /></Link>
                            <button className='btn btn-sm' id='deleteIcon'
                              onClick={user.user === 'admin' ? () => console.log(`Can't delete admin account`) : () => deleteuser(user.id)} disabled={user.user === 'admin' ? true : false}  ><BsTrash className='actionIcon' size='24px' /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          : <h3>{message}</h3>
      }
    </>
  )
}

export default CompShowusers