/* eslint-disable no-unused-expressions */
/* eslint-disable no-eval */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillPeopleFill, BsFillPersonCheckFill, BsTrash, BsFillPersonXFill } from 'react-icons/bs'
import { SlUserFollow, SlMagnifier, SlSettings, SlPrinter } from "react-icons/sl"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import CompPagination from './CompPagination';
import unauthorized from '../images/401.webp'
import { serverContext } from '../App';
import { CompLoader } from './CompLoader'

const token = localStorage.getItem("token")

const CompShowusers = ({ getname, notify }) => {
  const server = useContext(serverContext)
  const URI = `${server}/users/`

  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState(true)
  const [id, setId] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [active, setActive] = useState('')
  const [inactive, setInactive] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState()
  const [totalUsers, setTotalUsers] = useState()
  const [isdesktop, setIsDesktop] = useState(true)
  const [sortAsc, setSortAsc] = useState(true)
  const [sortArrow, setSortArrow] = useState()
  const [sortParam, setSortParam] = useState('Usuario')
  const [sortedUsers, setSortedUsers] = useState([])

  const navigate = useNavigate()

  const lastIndex = currentPage * usersPerPage
  const firstIndex = lastIndex - usersPerPage

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.withCredentials = true

  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(`${server}`)
      if (res.data.verified === true) {
        if (res.data.id !== '5MWtG6KkG4GPO-unt12kj') {
          setAdmin(prev => !prev)
        }
        setId(res.data.id)
        getname(res.data.fullname)
        return
      } else {
        navigate('/login')
      }
    }

    verifyUser()
    checkDisplay()
    getUsers()
    searchShortCut()
  }, [])

  const getUsers = async () => {
    try {
      const res = await axios.get(URI)
      setUsers(res.data)
      setSortedUsers(res.data)
      setTotalUsers(res.data.length)
      checkDisplay()
      setActive(res.data.filter(user => user.enabled === 1).length)
      setInactive(res.data.filter(user => user.enabled === 0).length)
    } catch (error) {
      console.log(error)
    }
  }

  const searchShortCut = ()=>{
    let keysPressed = {}
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;

      if (keysPressed['Control'] && event.key === 'b') {
        alert(event.key);
      }
    });

    document.addEventListener('keyup', (event) => {
      delete keysPressed[event.key];
    });
  }

  const checkDisplay = () => {
    window.innerHeight <= 768 ? setUsersPerPage(5) : setUsersPerPage(10)
    window.innerWidth <= 450 ? setIsDesktop(false) : setIsDesktop(true)
  }

  window.addEventListener('resize', () => {
    checkDisplay()
  })

  const filterUsers = async (filter) => {
    try {
      const res = await axios.get(URI + `search?user=${filter}`)
      if (res.data.length !== 0) {
        setSortedUsers(res.data)
        setTotalUsers(res.data.length)
        setCurrentPage(1)
      }
    } catch (error) {
      notify('err', <p>{error.response.data.message}</p>)
    }
  }

  const sort = (e) => {
    const param = ((e.target.innerHTML).split(' '))[0]
    setSortParam(param)
    let prm = ''
    switch (param) {
      case 'Usuario':
        prm = 'user'
        break
      case 'Nombre':
        prm = 'fullname'
        break
      case 'Creado':
        prm = 'createdAt'
        break
      case 'Modificado':
        prm = 'updatedAt'
        break
      default:
        prm = 'user'
    }

    setSortedUsers(users.toSorted((a, b) => {
      const sortDAta = `!sortAsc ? a.${prm}.localeCompare(b.${prm}) : b.${prm}.localeCompare(a.${prm})`
      return eval(sortDAta)
    }))

    setSortAsc(prev => !prev)
  }

  useEffect(() => {
    sortAsc === false ? setSortArrow(<TiArrowSortedUp color='#555' />) : setSortArrow(<TiArrowSortedDown color='#555' />)
  }, [sortAsc])

  const deleteuser = async (id) => {
    await axios.delete(URI + id)
    getUsers()
  }

  const CompNoAuth = () => {
    return (
      <>
        {
          !admin ?
            <div className='unauthCont'>
              <a href={`/edit/${id}`} ><img className='unauthImage animate__animated animate__fadeIn' src={unauthorized} alt='Unathorized'></img></a>
              <span className='noAccessText' style={{
                fontSize: window.innerWidth <= 420 ? '20px' : '36px',
                fontWeight: 'bold'
              }}>
                ACCESO RESTRINGIDO
              </span>
            </div>
            : null
        }
      </>
    )
  }

  return (
    <>
      {
        admin ?
          totalUsers > 0 ?
            <>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <section className='mainTools'>
                      <h1 className='sessionTitle fw-bold mb-3'>Listado de usuarios</h1>
                      <div className='input-group mb-3 searchBar '>
                        <span className='input-group-text ' id='search'><SlMagnifier /></span>
                        <input
                          className='form-control'
                          onChange={(e) => filterUsers(e.target.value)}
                          type='text'
                        />
                      </div>
                      <div className='gap-2 d-md-flex justify-content-md-center btn-tools-group'>
                        <Link to='/create' className='new-record btn btn-outline-success me-md-2 shadow-sm border-dark-subtle btn-tool' style={{ borderRadius: '8px' }}> <SlUserFollow size='22px' /> {isdesktop ? 'Nuevo' : null}</Link>

                        <Link to='/print' className='new-record btn btn-outline-secondary me-md-2 shadow-sm border-dark-subtle btn-tool' style={{ borderRadius: '8px' }}><SlPrinter size='22px' /> {isdesktop ? 'Imprimir' : null}</Link>

                      </div>
                    </section>
                    <div className='usersTable shadow-sm p-3 mb-5 '>
                      <table className='table table-responsive table-sm table-hover'>
                        <thead className='table' style={{ backgroundColor: '#000' }}>
                          <tr>
                            <th><span className='header' onClick={sort}>Usuario {sortParam === 'Usuario' ? sortArrow : null}</span></th>
                            <th><span className='header' onClick={sort}>Nombre y apellidos {sortParam === 'Nombre' ? sortArrow : null}</span></th>
                            <th><span className='header' onClick={sort}>Creado {sortParam === 'Creado' ? sortArrow : null}</span></th>
                            <th><span className='header' onClick={sort}>Modificado {sortParam === 'Modificado' ? sortArrow : null}</span></th>
                            <th><span className='header' >Estado</span></th>
                            <th><span className='header' >Acciones</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedUsers.map((user) => (
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
                          )).slice(firstIndex, lastIndex)}
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
                      ¿Seguro que desea borrar el usuario <b>{selectedUser}</b>?
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
            : <CompLoader />
          : <CompNoAuth />
      }
    </>
  )
}

export default CompShowusers