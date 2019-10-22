import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

const Pager = ({path, currentPage, numPages}) => {
  const pathWithoutPageNumber = path.replace(/\/?\d+$/, '')
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 
    ? pathWithoutPageNumber 
    : pathWithoutPageNumber + '/' + (currentPage - 1).toString()
  const nextPage = pathWithoutPageNumber + '/' + (currentPage + 1).toString()

  return (
    <div className='pager'>
      {!isFirst && (
        <Link to={prevPage} rel='prev'>
          ← Previous Page
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel='next'>
          Next Page →
        </Link>
      )}
    </div>
  )
}

Pager.propTypes = {
  path: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
}

export default Pager