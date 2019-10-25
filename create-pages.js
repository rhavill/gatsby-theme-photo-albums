const path = require('path')
const createFolderPages = require('./create-folder-pages')
const {getPhotoPathsWithPages} = require('./src/util/source-filesystem-photo-paths')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')

const query = `
  query {
    site {
      siteMetadata {
        photosPerPage
      }
    }
    folders: allDirectory(filter: {name: {ne: "images"}}) {
      nodes {
        relativePath
      }
    }
    photos: allFile(filter: {relativePath: {ne: "folder.png"}}, sort: {fields: relativePath}) {
      nodes {
        relativePath
        relativeDirectory
      }
    }
  }
`

const getQueryResults = async (graphql, reporter) => {
  const result = await graphql(query)
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }
  const photosPerPage = result.data.site.siteMetadata.photosPerPage

  return {
    files: result.data.photos.nodes,
    folders: result.data.folders.nodes,
    photosPerPage
  }
}

const createPhotoPages = (photosPerPage, createPage, files) => {
  const photoPaths = getPhotoPathsWithPages(photosPerPage, files)
  files.forEach(file => {
    createPage({
      path: photoPaths[file.relativePath],
      component: path.resolve('./src/pages/photo.js'),
      context: {
        relativePath: file.relativePath
      },
    })
  })
}

const createPages = async (graphql, reporter, createPage) => {
  const {files, folders, photosPerPage} = await getQueryResults(graphql,reporter)
  createFolderPages(photosPerPage, createPage, 
    objectArrayToPropArray('relativePath', files), 
    objectArrayToPropArray('relativePath', folders)
  )
  createPhotoPages(photosPerPage, createPage, files)
}

module.exports = createPages