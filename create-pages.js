const createFolderPages = require('./create-folder-pages')
const {getPhotoPathsWithPages} = require('./src/util/source-filesystem-photo-paths')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')

const query = `
  query {
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

  return {
    files: result.data.photos.nodes,
    folders: result.data.folders.nodes,
  }
}

const createPhotoPages = (basePath, photosPerPage, createPage, files) => {
  const photoPaths = getPhotoPathsWithPages(basePath, photosPerPage, files)
  files.forEach(file => {
    createPage({
      path: photoPaths[file.relativePath],
      component: require.resolve('./src/pages/photo.js'),
      context: {
        relativePath: file.relativePath,
        basePath
      },
    })
  })
}

const createPages = async (basePath, photosPerPage, graphql, reporter, createPage) => {
  const {files, folders} = await getQueryResults(graphql,reporter)
  createFolderPages(basePath, photosPerPage, createPage, 
    objectArrayToPropArray('relativePath', files), 
    objectArrayToPropArray('relativePath', folders)
  )
  createPhotoPages(basePath, photosPerPage, createPage, files)
}

module.exports = createPages