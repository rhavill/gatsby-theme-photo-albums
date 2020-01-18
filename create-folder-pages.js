const add = require('ramda/src/add')
const and = require('ramda/src/and')
const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const equals = require('ramda/src/equals')
const not = require('ramda/src/not')
const emitter = require('./src/util/event-emitter')
const {getPagerData} = require('./src/util/source-filesystem-pager-data')

const isFirstPage = pageIndex => equals(0, pageIndex)
const isNotFirstPage = compose(not, isFirstPage)
const isBaseUrl = (baseUrl, url) => baseUrl === url
const pageIndexToPageNumber = add(1)

const createFolderPages = (baseUrl, photosPerPage, createPage, files, folders) => {
  folders.forEach(folder => {
    const pagerData = getPagerData(folder, files, photosPerPage)
    // eslint-disable-next-line no-useless-escape
    const regexFilter = '/^' + folder + (folder ? '\/' : '') + '[^/]+$/'
    pagerData.forEach((pagerData, i) => {
      let url = folder
      if (and(isNotFirstPage(i), !isBaseUrl(baseUrl, url))) {
        url = concat(url, '/')
      }
      if (isNotFirstPage(i)) {
        url = concat(url, `${pageIndexToPageNumber(i)}`)
      }
      if (isBaseUrl(baseUrl, url)) {
        emitter.emit('indexContext', {
          ...pagerData,
          regexFilter,
          baseUrl
        })
      }
      
      createPage({
        path: url,
        component: require.resolve('./src/pages/index.js'),
        context: {
          ...pagerData,
          regexFilter,
          baseUrl
        }
      })
    })
  })
}

module.exports = createFolderPages