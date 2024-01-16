import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillPeopleFill, BsFillPersonCheckFill, BsTrash, BsFillPersonXFill} from 'react-icons/bs'
import { SlUserFollow, SlMagnifier, SlSettings } from "react-icons/sl";
import CompPagination from './CompPagination';
import unauthorized from '../images/401.webp'

export const SERVER = `http://192.168.237.14:4000`
const URI = `${SERVER}/users/`
const token = localStorage.getItem("token")

const CompShowusers = ({ getname }) => {
  const [users, setusers] = useState([])
  const [admin, setAdmin] = useState(false)
  const [id, setId] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [active, setActive] = useState('')
  const [inactive, setInactive] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)
  const [totalUsers, setTotalUsers] = useState()

  const navigate = useNavigate()

  const lastIndex = currentPage * usersPerPage
  const firstIndex = lastIndex - usersPerPage

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.withCredentials = true

  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(SERVER)

      if (res.data.verified === true) {
        if (res.data.id === '5MWtG6KkG4GPO-unt12kj') {
          setAdmin(true)
        }
        setId(res.data.id)
        getname(res.data.fullname)
        return
      } else {
        navigate('/login')
      }
    }
    verifyUser()
    displayCheck()
    getUsers()
  }, [getname, navigate])

  const getUsers = async () => {
    try {
      const res = await axios.get(URI)
      setusers(res.data)
      setTotalUsers(res.data.length)
      if (window.innerWidth <= 450) setUsersPerPage(7)
      setActive(res.data.filter(user => user.enabled === 1).length)
      setInactive(res.data.filter(user => user.enabled === 0).length)

    } catch (error) {
    }
  }


  const displayCheck = () =>{
    if (window.innerHeight <= 768) setUsersPerPage(7)
  }

  const filterUsers = async (filter) => {
    try {
      const res = await axios.get(URI + `search?user=${filter}`)
      if(res.data.length !== 0){
        setusers(res.data)
        setTotalUsers(res.data.length)
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const deleteuser = async (id) => {
    await axios.delete(URI + id)
    getUsers()
  }

  const CompNoAuth = () => {
    return (
      <>
        <div className='unauthCont'>
          <a href={`/edit/${id}`} ><img className='unauthImage animate__animated animate__fadeIn' src={unauthorized} alt='Unathorized'></img></a>
        </div>
      </>
    )
  }

  return (
    <>
      {
        admin && totalUsers > 0 ?
          <>
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <section className='mainTools'>
                    <h1 className='sessionTitle fw-bold mb-3'>Listado de usuarios</h1>
                    <div className='input-group mb-3'>
                      <span className='input-group-text ' id='search'><SlMagnifier /></span>
                      <input
                        className='form-control'
                        onChange={(e) => filterUsers(e.target.value)}
                        type='text'
                      />
                    </div>
                    <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
                      <Link to='/create' className='new-record btn btn-outline-secondary me-md-2 shadow-sm border-dark-subtle' style={{ borderRadius: '8px' }}><SlUserFollow size='22px' /> Nuevo</Link>
                    </div>
                  </section>
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
                              <Link to={`/edit/${user.id}`} className='btn btn-sm ' id='editIcon'><SlSettings className='actionIcon' size='26px' /></Link>
                              <button className='btn btn-sm' id='deleteIcon' data-bs-toggle="modal" data-bs-target="#deleteModal"
                                onClick={user.user === 'admin' ? () => console.log(`Can't delete admin account`) : () => {
                                  setSelectedId(user.id); setSelectedUser(user.user)
                                }} disabled={user.user === 'admin' ? true : false}  ><BsTrash className='actionIcon' size='24px' /></button>
                            </td>
                          </tr>
                        )).sort((a, b) => {
                          return a.user - b.user
                        }).slice(firstIndex, lastIndex)}
                      </tbody>
                    </table>
                  </div>
                  <CompPagination
                    usersPerPage={usersPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalUsers={totalUsers}
                  />
                </div>
              </div>
            </div>

            {/* Delete user Modal */}
            <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar usuario</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    Seguro que desea borrar el usuario <b>{selectedUser}</b>?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteuser(selectedId)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='footer'>
              <p><BsFillPeopleFill /> Total: {totalUsers}</p>
              <p><BsFillPersonCheckFill /> Activos: {active}</p>
              <p><BsFillPersonXFill /> Inactivos: {inactive}</p>
            </div>
          </>
          : <CompNoAuth />
      }
    </>
  )
}

export default CompShowusers