const createFolderPages = require('./create-folder-pages')
const {getPhotoPathsWithPages} = require('./src/util/photo-paths')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')

const query = `
  query {
      folders: allDirectory(filter: {sourceInstanceName: {eq: "gtpaPhotos"}}) {
        nodes {
        relativePath
        url
      }
    }
    photos: allFile(filter: {sourceInstanceName: {eq: "gtpaPhotos"}}, sort: {fields: relativePath}) {
        nodes {
        relativePath
        relativeDirectory
        url
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
    createPage({
      path: photoPaths[file.url],
      component: require.resolve('./src/pages/photo.js'),
      context: {
        relativePath: file.relativePath,
      },
    })
  })
}

const createPages = async (baseUrl, photosPerPage, graphql, reporter, createPage) => {
  const {files, folders} = await getQueryResults(graphql,reporter)
  createFolderPages(baseUrl, photosPerPage, createPage, 
    objectArrayToPropArray('url', files), 
    objectArrayToPropArray('url', folders)
  )
  createPhotoPages(photosPerPage, createPage, files)
}

module.exports = createPages