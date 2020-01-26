import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import merge from 'ramda/src/merge'
import prop from 'ramda/src/prop'
import Layout from '../components/layout/Layout'
import Folders from '../components/folders/Folders'
import Thumbnails from '../components/thumbnails/Thumbnails'
import Pager from '../components/pagination/Pager'
import {addUrlProps} from '../util/files-folders'
import {removePathPrefix} from '../util/url-text'

const Index = ({data, location, pageContext}) => {
  const {baseUrl, currentPage, numPages} = pageContext
  const pathPrefix = data.site.pathPrefix
  const path = compose(
    removePathPrefix(pathPrefix), decodeURI
  )(location.pathname)
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
  query indexQuery($skip: Int!, $limit: Int!, $relativeDirectory: String!) {
    site {
      pathPrefix
    }
    photos: allFile(
      filter: {
        sourceInstanceName: {eq: "gtpaPhotos"}, 
        relativeDirectory: {eq: $relativeDirectory}
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
        relativeDirectory: {eq: $relativeDirectory}
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
    site: PropTypes.shape({
      pathPrefix: PropTypes.string.isRequired,
    }),
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
    relativeDirectory: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
  }).isRequired
}

export default Index