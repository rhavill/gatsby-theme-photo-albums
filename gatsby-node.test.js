const fs = require('fs')
const compose = require('ramda/src/compose')
const last = require('ramda/src/last')
const prop = require('ramda/src/prop')
const emitter = require('./src/util/event-emitter')
const {onCreatePage, onPreBootstrap} = require('./gatsby-node')

const createPage = jest.fn()
const deletePage = jest.fn()
const actions = {
  createPage,
  deletePage
}
const indexPage = {
  path: '/'
}
const photoPage = {
  path: '/photo/'
}

jest.mock('fs')
fs.existsSync
  .mockImplementationOnce(() => false)
  .mockImplementationOnce(() => true)
const mkdirSync = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {})

const reporter = {
  info: jest.fn()
}

beforeEach(() => {
  deletePage.mockClear()
})

describe('gatsby-node', () => {

  it('onPreBootstrap creates an albumsPath if it does not exist.', () => {
    onPreBootstrap({reporter}, {albumsPath: 'photos'})
    expect(fs.existsSync).toHaveBeenCalled()
    expect(mkdirSync.mock.calls.length).toBe(1)
  })

  it('onPreBootstrap does not create an albumsPath if it exists.', () => {
    onPreBootstrap({reporter}, {albumsPath: 'photos'})
    expect(fs.existsSync.mock.calls.length).toBe(2)
    expect(mkdirSync.mock.calls.length).toBe(1)
  })

  it('onCreatePage calls createPage and deletePage if page path is "/"', () => {
    onCreatePage({page: indexPage, actions})
    expect(createPage.mock.calls.length).toBe(1)
    expect(deletePage.mock.calls.length).toBe(1)
  })

  it('onCreatePage calls deletePage if page path is "/photo/"', () => {
    onCreatePage({page: photoPage, actions})
    expect(deletePage.mock.calls.length).toBe(1)
  })

  it('listens to indexContext and sets pager data for index page accordingly', () => {
    const pagerData = {limit: 4, skip: 8, numPages: 10, currentPage: 5}
    emitter.emit('indexContext', pagerData)
    onCreatePage({page: indexPage, actions})
    const context = compose(prop('context'), last, last)(createPage.mock.calls)
    expect(context).toEqual(pagerData)
  })
 
})