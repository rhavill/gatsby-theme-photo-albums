const fs = require('fs')
const compose = require('ramda/src/compose')
const last = require('ramda/src/last')
const prop = require('ramda/src/prop')
const {onCreatePage, onPreBootstrap} = require('../gatsby-node')

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

})