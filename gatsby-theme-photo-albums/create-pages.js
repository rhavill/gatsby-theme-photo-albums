const sizeOf = require('image-size')
const createFolderPages = require('./create-folder-pages')
const {getPhotoPathsWithPages} = require('./src/util/photo-paths')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')
const {addUrlProps} = require('./src/util/files-folders')

const query = `
  query {
      folders: allDirectory(filter: {sourceInstanceName: {eq: "gtpaPhotos"}}) {
        nodes {
        relativePath
        relativeDirectory
      }
    }
    photos: allFile(filter: {sourceInstanceName: {eq: "gtpaPhotos"}}, sort: {fields: relativePath}) {
        nodes {
        absolutePath
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
  return {
    files: result.data.photos.nodes,
    folders: result.data.folders.nodes,
  }
}

const createPhotoPages = (photosPerPage, createPage, files) => {
  const photoPaths = getPhotoPathsWithPages(photosPerPage, files)
  files.forEach(file => {
    const {width, height} = sizeOf(file.absolutePath)
    createPage({
      path: photoPaths[file.url].url,
      component: require.resolve('./src/templates/Photo.js'),
      context: {
        relativePath: file.relativePath,
        width,
        height,
      },
    })
  })
}

const createPages = async (baseUrl, photosPerPage, graphql, reporter, createPage) => {
  const result = await getQueryResults(graphql,reporter)
  const folders = addUrlProps(baseUrl, result.folders)
  const files = addUrlProps(baseUrl, result.files)
  createFolderPages(baseUrl, photosPerPage, createPage, 
    objectArrayToPropArray('url', files), folders
  )
  createPhotoPages(photosPerPage, createPage, files)
}

module.exports = createPages