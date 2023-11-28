import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER } from './ShowUsers';

const PORT = 4000

const URI = `${SERVER}/error`

const CompPageNotFound = () => {

  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.defaults.withCredentials = true
      const verifyUser = async () => {
        const res = await axios.get(SERVER)
        if (res.data.Status === 'success') {
          setAuth(true)
        } else {
          navigate('/login')
          window.location.reload(true)
        }
      }
      verifyUser()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      {
        auth ?
          <h1>Nothing to do here...</h1>
          : ''
      }
    </>
  )
}

export default CompPageNotFound
