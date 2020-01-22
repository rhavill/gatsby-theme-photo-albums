const createFolderPages = require('../create-folder-pages')
const {objectArrayToPropArray} = require('../src/util/ramda-utils')
const queryResults = require('../test-data/create-pages-graphql-results')

const pageCreator = () => {
  let pages = []
  const getPages = () => pages
  const createPage = ({path, context}) => pages.push({path, component: 'dummy', context})
  return {getPages, createPage}
}

const baseUrl = '/base/'

describe('create-folder-pages', () => {
  it('creates folder pages from graphql data', () => {
    // This test assumes photosPerPage is 15
    const photosPerPage = 15
    const files = objectArrayToPropArray('url', queryResults.data.photos.nodes)
    const folders = objectArrayToPropArray('url', queryResults.data.folders.nodes)
    const creator = pageCreator()
    const exptected = [
      {
        path: '/base/', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/[^/]+$/'}
      },
      {
        path: '/base/2019-puerto-rico', 
        component: 'dummy', 
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/2019-puerto-rico\/[^/]+$/'}
      },
      {
        path: '/base/2019-puerto-rico/jayuya', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/2019-puerto-rico\/jayuya\/[^/]+$/'}
      },
      {
        path: '/base/2019-puerto-rico/san-juan', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/2019-puerto-rico\/san-juan\/[^/]+$/'}
      },
    ]
    createFolderPages(baseUrl, photosPerPage, creator.createPage, files, folders)
    expect(creator.getPages()).toEqual(exptected)
  })  
  it('creates folder page for index page with single folder', () => {
    const creator = pageCreator()
    const exptected = [
      {
        path: '/base/', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/[^/]+$/'}
      },
      {
        path: '/base/sub-folder', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^/base/sub-folder/[^/]+$/'}
      },
    ]
    createFolderPages(baseUrl, 5, creator.createPage, [], ['/base/', '/base/sub-folder'])
    expect(creator.getPages()).toEqual(exptected)
  })
})
