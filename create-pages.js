const md5 = require('md5')
const createFolderPages = require('./create-folder-pages')
const {prependbaseUrl} = require('./src/util/text-utils')
const {getPhotoPathsWithPages} = require('./src/util/source-filesystem-photo-paths')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')

const query = `
  query {
      #folders: allDirectory(filter: {name: {ne: "images"}}) {
      folders: allDirectory {
        nodes {
        relativePath
        url
      }
    }
    # photos: allFile(filter: {relativePath: {ne: "folder.png"}}, sort: {fields: relativePath}) {
    photos: allFile(filter: {relativePath: {ne: "folder.png"}}, sort: {fields: relativePath}) {
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

const createPhotoPages = (baseUrl, photosPerPage, createPage, createNode, files) => {
  const photoUrls = getPhotoPathsWithPages(photosPerPage, files)
  files.forEach(file => {
    createPage({
      path: photoUrls[file.url],
      component: require.resolve('./src/pages/photo.js'),
      context: {
        relativePath: file.relativePath,
        url: photoUrls[file.url],
      },
    })
    
    const nodeData = {
      relativeDirectoryUrl: prependbaseUrl(baseUrl, file.relativeDirectory),
      relativePath: file.relativePath,
      url: photoUrls[file.url],
    }
    const hash = md5(JSON.stringify(nodeData))
    
    createNode({
      // Data for the node.
      ...nodeData,
    
      // Required fields.
      id: file.relativePath,
      parent: null, // or null if it's a source node without a parent
      children: [],
      internal: {
        type: 'GalleryPhoto',
        contentDigest: hash,
      }
    })
  })
}

const createPages = async (baseUrl, photosPerPage, graphql, reporter, createPage, createNode) => {
  const {files, folders} = await getQueryResults(graphql,reporter)
  createFolderPages(baseUrl, photosPerPage, createPage, 
    objectArrayToPropArray('url', files), 
    objectArrayToPropArray('url', folders)
  )
  createPhotoPages(baseUrl, photosPerPage, createPage, createNode, files)
}

module.exports = createPages