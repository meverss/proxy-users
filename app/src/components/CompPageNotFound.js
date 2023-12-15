import axios from 'axios';
import notfound from '../images/404.webp'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { SERVER } from './ShowUsers';

const token = sessionStorage.getItem("token")


const CompPageNotFound = () => {
  const [id, setId] = useState('')
  const navigate = useNavigate()
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.defaults.withCredentials = true
  
  useEffect(() => {
    const verifyUser = async () => {
      const res = await axios.get(SERVER)
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
        <a href={id === 1 ? '/' : `/edit/${id}`} ><img className='unauthImage animate__animated animate__fadeIn' src={notfound} alt='Page not found'></img></a>
      </div>
    </>
  )
}

export default CompPageNotFound
