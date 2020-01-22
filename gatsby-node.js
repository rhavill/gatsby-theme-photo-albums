const fs = require('fs')
const themeConfig = require('./theme-config')
const createPages = require('./create-pages')
const {prependbaseUrl, ensureLeadingAndTrailingSlash} = require('./src/util/url-text')

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