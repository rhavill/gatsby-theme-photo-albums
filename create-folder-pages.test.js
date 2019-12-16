const createFolderPages = require('./create-folder-pages')
const emitter = require('./src/util/event-emitter')
const {objectArrayToPropArray} = require('./src/util/ramda-utils')
const queryResults = require('./src/test-data/create-pages-graphql-results')

const pageCreator = () => {
  let pages = []
  const getPages = () => pages
  const createPage = ({path, context}) => pages.push({path, component: 'dummy', context})
  return {getPages, createPage}
}

const basePath = '/'

describe('create-folder-pages', () => {
  it('creates folder pages from graphql data', () => {
    // This test assumes photosPerPage is 15
    const photosPerPage = 15
    const files = objectArrayToPropArray('relativePath', queryResults.data.photos.nodes)
    const folders = objectArrayToPropArray('relativePath', queryResults.data.folders.nodes)
    const creator = pageCreator()
    const exptected = [
      {
        path: '/', 
        component: 'dummy', 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico', 
        component: 'dummy', 
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^2019-puerto-rico\/[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico/jayuya', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 0, numPages: 4, currentPage: 1, regexFilter: '/^2019-puerto-rico\/jayuya\/[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico/jayuya/2', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 15, numPages: 4, currentPage: 2, regexFilter: '/^2019-puerto-rico\/jayuya\/[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico/jayuya/3', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape
        context: {limit: photosPerPage, skip: 30, numPages: 4, currentPage: 3, regexFilter: '/^2019-puerto-rico\/jayuya\/[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico/jayuya/4', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape 
        context: {limit: photosPerPage, skip: 45, numPages: 4, currentPage: 4, regexFilter: '/^2019-puerto-rico\/jayuya\/[^/]+$/', basePath}
      },
      {
        path: '/2019-puerto-rico/san-juan', 
        component: 'dummy',
        // eslint-disable-next-line no-useless-escape 
        context: {limit: photosPerPage, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^2019-puerto-rico\/san-juan\/[^/]+$/', basePath}
      },
    ]
    createFolderPages(basePath, photosPerPage, creator.createPage, files, folders)
    expect(creator.getPages()).toEqual(exptected)
  })  
  it('creates folder page for index page with single folder', () => {
    const creator = pageCreator()
    const exptected = [
      {
        path: '/', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^[^/]+$/', basePath}
      },
      {
        path: '/sub-folder', 
        component: 'dummy', 
        context: {limit: 5, skip: 0, numPages: 1, currentPage: 1, regexFilter: '/^sub-folder/[^/]+$/', basePath}
      },
    ]
    createFolderPages(basePath, 5, creator.createPage, [], ['', 'sub-folder'])
    expect(creator.getPages()).toEqual(exptected)
  })
  it('emits an "indexContext" event when the index page is created', () => {
    const listener = jest.fn()
    const createPage = jest.fn()
    emitter.on('indexContext', listener)
    createFolderPages(basePath, 5, createPage, [], [''])
    expect(listener.mock.calls.length).toBe(1)
  })  
})
