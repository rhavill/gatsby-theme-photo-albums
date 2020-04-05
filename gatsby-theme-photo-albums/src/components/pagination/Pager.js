import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import PagerStyles from '../../styles/Pager'
import PreviousPageText from './PreviousPageText'
import NextPageText from './NextPageText'
import {getPagerUrls} from '../../util/url-text'

const Pager = ({path, currentPage, numPages}) => {
  const {prev, next} = getPagerUrls(path, currentPage, numPages)

  return (
    <PagerStyles>
      {prev ? (
        <Link to={prev} rel='prev'>
          <PreviousPageText />
        </Link>
      ) : null}
      {next ? (
        <Link to={next} rel='next'>
          <NextPageText />
        </Link>
      ) : null}
    </PagerStyles>
  )
}

Pager.propTypes = {
  path: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
}

export default Pager