const add = require('ramda/src/add')
const and = require('ramda/src/and')
const compose = require('ramda/src/compose')
const concat = require('ramda/src/concat')
const equals = require('ramda/src/equals')
const not = require('ramda/src/not')
const {getPagerData} = require('./src/util/files-folders')

const isFirstPage = pageIndex => equals(0, pageIndex)
const isNotFirstPage = compose(not, isFirstPage)
const pageIndexToPageNumber = add(1)

const createFolderPages = (baseUrl, photosPerPage, createPage, files, folders) => {
  folders.forEach(folder => {
    const pagerData = getPagerData(folder, files, photosPerPage)
    // The regexFilter allows the child folders and photos of the current page 
    // to be returned by the index page graphql query. 
    // The trailing slash is removed (if it exists), because the url will have
    // a trailing slash if it is the base url.
    // eslint-disable-next-line no-useless-escape
    const regexFilter = '/^' + folder.replace(/\/$/, '') + (folder ? '\/' : '') 
      + '[^/]+$/'
    pagerData.forEach((pagerData, i) => {
      let url = folder
      if (and(isNotFirstPage(i), !(url === baseUrl))) {
        url = concat(url, '/')
      }
      if (isNotFirstPage(i)) {
        url = concat(url, `${pageIndexToPageNumber(i)}`)
      }
      
      createPage({
        path: url,
        component: require.resolve('./src/templates/Index.js'),
        context: {
          ...pagerData,
          regexFilter
        }
      })
    })
  })
}

module.exports = createFolderPages