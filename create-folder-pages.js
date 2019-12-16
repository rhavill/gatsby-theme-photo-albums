const add = require('ramda/src/add')
const and = require('ramda/src/and')
const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const equals = require('ramda/src/equals')
const not = require('ramda/src/not')
const emitter = require('./src/util/event-emitter')
const {getPagerData} = require('./src/util/source-filesystem-pager-data')

const pathToUrl = (basePath, folder) => concat(basePath, folder)
const isFirstPage = pageIndex => equals(0, pageIndex)
const isNotFirstPage = compose(not, isFirstPage)
const isBaseUrl = (basePath, url) => basePath === url
const pageIndexToPageNumber = add(1)

const createFolderPages = (basePath, photosPerPage, createPage, files, folders) => {
  folders.forEach(folder => {
    const pagerData = getPagerData(folder, files, photosPerPage)
    // eslint-disable-next-line no-useless-escape
    const regexFilter = '/^' + folder + (folder ? '\/' : '') + '[^/]+$/'
    pagerData.forEach((pagerData, i) => {
      let url = pathToUrl(basePath, folder)
      if (and(isNotFirstPage(i), !isBaseUrl(basePath, url))) {
        url = concat(url, '/')
      }
      if (isNotFirstPage(i)) {
        url = concat(url, `${pageIndexToPageNumber(i)}`)
      }
      if (url === basePath) {
        emitter.emit('indexContext', {
          ...pagerData,
          regexFilter,
          basePath
        })
      }
      createPage({
        path: url,
        component: require.resolve('./src/pages/index.js'),
        context: {
          ...pagerData,
          regexFilter,
          basePath
        }
      })
    })
  })
}

module.exports = createFolderPages