const fs = require('fs')
const createPages = require('./create-pages')
const defaults = require('./default-config')
const {ensureLeadingAndTrailingSlash} = require('./src/util/url-text')

exports.onPreBootstrap = ({ reporter }, options) => {
  const albumsPath = options.albumsPath || defaults.albumsPath
  if (!fs.existsSync(albumsPath)) {
    reporter.info(`creating the ${albumsPath} directory`)
    fs.mkdirSync(albumsPath)
  }
}

exports.createPages = async ({ graphql, actions, reporter }, 
  { baseUrl = defaults.baseUrl, photosPerPage = defaults.photosPerPage }) => {
  baseUrl = ensureLeadingAndTrailingSlash(baseUrl)
  const { createPage } = actions
  await createPages(baseUrl, photosPerPage, graphql, reporter, createPage)
}