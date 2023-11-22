import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsJournalText, BsTrash } from 'react-icons/bs'
import { SlUserFollow, SlMagnifier } from "react-icons/sl";

const PORT = 4000
export const SERVER = `http://localhost:${PORT}`
const URI = `${SERVER}/users/`

const CompShowusers = () => {
  const [auth, setAuth] = useState(false)
  const [username, setUsernam] = useState('')
  const [users, setusers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.defaults.withCredentials = true
    const verifyUser = async () => {
      const res = await axios.get(SERVER)
      if (res.data.Status === 'success') {
        setAuth(true)
        setUsernam(res.data.fullname)
      } else {
        console.log('Error')
        navigate('/login')
        window.location.reload(true)
      }
    }
    verifyUser()
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
      {
        auth ?
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
                    <thead className='table' style={{backgroundColor: '#000'}}>
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
                            <Link to={`/edit/${user.id}`} className='btn btn-sm '><BsJournalText size='26px' /></Link>
                            <button className='btn btn-sm' onClick={() => deleteuser(user.id)}><BsTrash size='24px' /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          : ''
      }
    </>
  )
}

export default CompShowusers