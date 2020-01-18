const fs = require('fs')
const themeConfig = require('./theme-config')
const emitter = require('./src/util/event-emitter')
const createPages = require('./create-pages')
const {prependbaseUrl, ensureLeadingAndTrailingSlash} = require('./src/util/text-utils')

let indexContext

emitter.on('indexContext', data => indexContext = data)

exports.onPreBootstrap = ({ reporter }, options) => {
  const albumsPath = options.albumsPath || themeConfig.defaultAlbumsPath
  if (!fs.existsSync(albumsPath)) {
    reporter.info(`creating the ${albumsPath} directory`)
    fs.mkdirSync(albumsPath)
  }
}

exports.createPages = async ({ graphql, actions, reporter }, 
  { baseUrl = '/', photosPerPage = 15 }) => {
  baseUrl = ensureLeadingAndTrailingSlash(baseUrl)
  const { createPage } = actions
  createPages(baseUrl, photosPerPage, graphql, reporter, createPage)
}

exports.onCreatePage = ({ page, actions }) => {
  // Allow paged results functionality on index page
  const { createPage, deletePage } = actions
  if (page.path === '/') {
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        ...indexContext
      },
    })  
  }
  if (page.path === '/photo/') {
    deletePage(page)
  }
}

exports.createSchemaCustomization = ({actions}, {baseUrl = '/'}) => {
  const {createFieldExtension, createTypes} = actions
  baseUrl = ensureLeadingAndTrailingSlash(baseUrl)
  
  createFieldExtension({
    name: 'url',
    extend() {
      return {
        resolve(source) {
          return prependbaseUrl(baseUrl, source.relativePath)
        },
      }
    },
  })

  createTypes(`
    type File implements Node {
      url: String @url
    }
    type Directory implements Node {
      url: String @url
    }
  `)
}