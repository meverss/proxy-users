import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const PORT = 4000

const URI = `http://192.168.181.15:${PORT}/error`

const CompPageNotFound = async () => {
  // const navigate = useNavigate()
  await axios.get(URI)
}

export default CompPageNotFound
