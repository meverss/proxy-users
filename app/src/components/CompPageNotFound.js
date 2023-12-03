import axios from 'axios';
import notfound from '../images/404.webp'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { SERVER } from './ShowUsers';


const CompPageNotFound = () => {
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
  }, [])
  

  return (
    <>
        <div className='unauthCont'>
        <img className='unauthImage animate__animated animate__fadeIn' src={notfound} alt='Page not found'></img>
      </div>
    </>
  )
}

export default CompPageNotFound
