import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PORT = 4000

const URI = `http://192.168.181.15:${PORT}/users/`

const CompEditUser = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()
  // id = 4
  // Procedure for updating User
  const updateUser = async (e) => {
    e.preventDefault()
    await axios.patch(URI + id, { title, content })
    navigate('/')
  }

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = async () => {
    const res = await axios.get(URI + id)
    setTitle(res.data[0].title)
    setContent(res.data[0].content)
  }

  const showModal = () => {
    const exampleModal = document.getElementById('exampleModal')
    exampleModal.classList.toggle('show')
  }

  return (
    <>
      <div className='container'>
        {/* Button trigger modal */}
        <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onClick={showModal}>
          Launch demo modal
        </button>

        {/* Modal */}
        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>Modal title</h1>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
              </div>
              <div className='modal-body'>
                <form onSubmit={updateUser}>
                  <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                      placeholder={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type='text'
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                      placeholder={content}
                      onChange={(e) => setContent(e.target.value)}
                      type='text'
                      className='form-control'
                    />
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={() => navigate('/')}>Close</button>
                    <button type='submit' className='btn btn-primary'>Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <br /><br />
        <h1>Edit User id:{id}</h1>
      </div>
      <p id='fecha' style={{ bottom: 0 }} />
    </>
  )
}

export default CompEditUser
