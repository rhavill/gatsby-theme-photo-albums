const fs = require('fs')
const themeConfig = require('./theme-config')
const createPages = require('./create-pages')
const {ensureLeadingAndTrailingSlash} = require('./src/util/url-text')

exports.onPreBootstrap = ({ reporter }, options) => {
  const albumsPath = options.albumsPath || themeConfig.albumsPath
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