import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnails from '../components/Thumbnails'
import Pager from '../components/Pager'

const Index = ({data, location, pageContext}) => {
  const {currentPage, numPages} = pageContext
  const path = location.pathname
  const folders = map(prop('url'), data.folders.nodes)
  const folderIcon = data.folderIcon.childImageSharp.fixed
  
  return (
    <Layout path={path}>
      <div className="listing-page" data-testid={path} >
        <section>
          <Folders path={path} folders={folders} icon={folderIcon} />
          <Thumbnails path={path} data={data} currentPage={currentPage} 
            baseUrl='/base' />
        </section>
      </div>
      <Pager path={path} currentPage={currentPage} numPages={numPages} />
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
    folderIcon: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.shape({
          src: PropTypes.string.isRequired,
          srcSet: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
        }).isRequired
      }).isRequired       
    }).isRequired,
    folders: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          relativePath: PropTypes.string.isRequired
        }).isRequired   
      ).isRequired
    }).isRequired,
    photos: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    regexFilter: PropTypes.string.isRequired,
  }).isRequired
}

export default Index