import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import merge from 'ramda/src/merge'
import prop from 'ramda/src/prop'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnails from '../components/Thumbnails'
import Pager from '../components/Pager'
const {addUrlProps} = require('../util/files-folders')

const Index = ({data, location, pageContext}) => {
  const {baseUrl, currentPage, numPages} = pageContext
  const path = decodeURI(location.pathname)
  const folders = compose(
    map(prop('url')),
    addUrlProps(baseUrl))(data.folders.nodes)
  const files = compose(
    map(file => merge(file, {imageData: file.childImageSharp.fixed})),
    addUrlProps(baseUrl))(data.photos.nodes)
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
        sourceInstanceName: {eq: "gtpaPhotos"}, 
        relativePath: {regex: $regexFilter}
      }, 
      sort: {fields: relativePath} 
      limit: $limit 
      skip: $skip) {
      nodes {
        relativePath
        childImageSharp {
          fixed(width: 250, height: 250, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed
          }
        }      
      }
    }
    folderIcon: file(sourceInstanceName: {eq: "gtpaFolderIcon"}) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    folders: allDirectory(
      filter: {
        sourceInstanceName: {eq: "gtpaPhotos"},
        relativePath: {regex: $regexFilter}
      }, 
      sort: {fields: relativePath}) {
      nodes {
        relativePath
      }
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
          relativePath: PropTypes.string.isRequired,
        }).isRequired   
      ).isRequired
    }).isRequired,
    photos: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          relativePath: PropTypes.string.isRequired,
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
    baseUrl: PropTypes.string.isRequired,
  }).isRequired
}

export default Index