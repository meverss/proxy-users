import React from 'react'

const CompPagination = ({ usersPerPage, currentPage, setCurrentPage, totalUsers }) => {
  const Pages = []
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    Pages.push(i)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const previusPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }
  const nextPage = () => {
    if (currentPage !== Pages.length) setCurrentPage(currentPage + 1)
  }
  const firstPage = () => {
    setCurrentPage(1)
  }
  const lastPage = () => {
    setCurrentPage(Pages.length)
  }

  return (
    <nav className='paginationBar is-rounded'>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" onClick={previusPage}>Anterior</a>
        </li>
        <li>
          <a className="page-link" onClick={firstPage}>{`<<`}</a>
        </li>
        {Pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`} onClick={() => goToPage(page)}><a className="page-link" >{page}</a></li>
        ))
        }
        <li>
          <a className="page-link" onClick={lastPage}>{`>>`}</a>
        </li>
        <li className={`page-item ${currentPage === Pages.length ? 'disabled' : ''}`}>
          <a className="page-link" onClick={nextPage}>Siguiente</a>
        </li>
      </ul>
    </nav>
  )
}

export default CompPagination
