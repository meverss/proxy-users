import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const PORT = 4000

const URI = `http://localhost:${PORT}/error`

const CompPageNotFound = () => {
  const [errorPage, setErrorPage] = useState('')
  useEffect(() => {
    getErrorPage()
  }, [])

  const getErrorPage = async () => {
    const res = await axios.get(URI)
    setErrorPage(res.data)
  }

  return (
    <>
      {errorPage}
    </>
  )
}

export default CompPageNotFound
