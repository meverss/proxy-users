import axios from 'axios';
import notfound from '../images/404.webp'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { serverContext } from '../App'

const token = localStorage.getItem("token")

const CompPageNotFound = () => {

  const server = useContext(serverContext)

  const [id, setId] = useState('')
  const navigate = useNavigate()

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.withCredentials = true

  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(`${server}`)
      if (res.data.verified === true) {
        setId(res.data.id)
        return
      } else {
        navigate('/login')
      }
    }
    verifyUser()
  }, [])


  return (
    <>
      <div className='unauthCont'>
        <div className='unauthImage '>
          <a href={id === 1 ? '/' : `/edit/${id}`} ><img className='animate__animated animate__fadeIn' src={notfound} alt='Page not found'></img></a>
          <br />
        </div>
        <span className='notFoundText' style={{
          fontSize: window.innerWidth <= 420 ? '20px' : '36px',
          fontWeight: 'bold'
        }}>
          PÁGINA NO ENCONTRADA
        </span>
      </div>

    </>
  )
}

export default CompPageNotFound
