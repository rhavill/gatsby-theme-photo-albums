const path = require('path')
const createFolderPages = require('./create-folder-pages')
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
    photos: allFile(filter: {relativePath: {ne: "folder.png"}}) {
      nodes {
        relativePath
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
    files: objectArrayToPropArray('relativePath', result.data.photos.nodes),
    folders: objectArrayToPropArray('relativePath', result.data.folders.nodes),
    photosPerPage
  }
}

const createPhotoPages = (createPage, files) => {
  files.forEach(file => {
    createPage({
      path: file,
      component: path.resolve('./src/pages/Photo.js'),
      context: {
        relativePath: file
      },
    })
  })
}

const createPages = async (graphql, reporter, createPage) => {
  const {files, folders, photosPerPage} = await getQueryResults(graphql,reporter)
  createFolderPages(photosPerPage, createPage, files, folders)
  createPhotoPages(createPage, files)
}

module.exports = createPages