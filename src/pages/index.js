import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnails from '../components/Thumbnails'
import Pager from '../components/Pager'
import {gatsbyPathnameToChildComponentPath} from '../util/text-utils'

const Index = ({data, location, pageContext}) => {
  const {currentPage, numPages, baseUrl} = pageContext
  const path = gatsbyPathnameToChildComponentPath(baseUrl, location.pathname, data)

  return (
    <Layout path={location.pathname}>
      <div className="listing-page" data-testid={path} >
        <section>
          <Folders path={path} data={data} baseUrl={baseUrl} />
          <Thumbnails path={path} data={data} currentPage={currentPage} 
            baseUrl={baseUrl} />
        </section>
      </div>
      <Pager path={location.pathname} currentPage={currentPage} numPages={numPages} />
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query indexQuery($skip: Int!, $limit: Int!, $regexFilter: String!) {
    # Ideally, the next few lines of this query would be part of ThumbnailsFragment, 
    # but putting the line in that fragment caused the error: 'Variable "$skip" 
    # is never used in operation "indexQuery"'
    photos: allFile(filter: {
        relativePath: {ne: "folder.png", regex: $regexFilter}}, 
        sort: {fields: relativePath} limit: $limit skip: $skip) {
          ...ThumbnailsFragment
    }
    ...FoldersFragment
    site {
      pathPrefix
    }
  }
`

Index.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    photos: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    regexFilter: PropTypes.string.isRequired,
  }).isRequired
}

export default Index