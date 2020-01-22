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
  const path = decodeURI(location.pathname)
  const folders = map(prop('url'), data.folders.nodes)
  const files = map(node => ({
    url: node.url,
    imageData: node.childImageSharp.fixed
  }), data.photos.nodes)
  const folderIcon = data.folderIcon.childImageSharp.fixed
  
  return (
    <Layout path={path}>
      <div className="listing-page" data-testid={path} >
        <section>
          <Folders path={path} folders={folders} icon={folderIcon} />
          <Thumbnails files={files} currentPage={currentPage} />
        </section>
      </div>
      <Pager path={path} currentPage={currentPage} numPages={numPages} />
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query indexQuery($skip: Int!, $limit: Int!, $regexFilter: String!) {
    photos: allFile(
      filter: {
        relativePath: {ne: "folder.png"}, 
        url: {regex: $regexFilter}
      }, 
      sort: {fields: relativePath} 
      limit: $limit 
      skip: $skip) {
      nodes {
        url
        childImageSharp {
          fixed(width: 250, height: 250, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed
          }
        }      
      }
    }
    folderIcon: file(relativePath: { eq: "folder.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    folders: allDirectory(
      filter: {
        name: {ne: "images"},
        url: {regex: $regexFilter}
      }, 
      sort: {fields: relativePath}) {
      nodes {
        url
      }
    }
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
        fixed: PropTypes.object.isRequired
      }).isRequired       
    }).isRequired,
    folders: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired   
      ).isRequired
    }).isRequired,
    photos: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          childImageSharp: PropTypes.shape({
            fixed: PropTypes.object.isRequired,
          })
        }).isRequired   
      ).isRequired
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    regexFilter: PropTypes.string.isRequired,
  }).isRequired
}

export default Index