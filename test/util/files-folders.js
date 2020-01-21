import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import {getChildPaths, getPagerData} from '../../src/util/files-folders'
import {objectArrayToPropArray} from '../../src/util/ramda-utils'
import folderData from '../../test-data/source-filesystem-folder-data'
import fileData from '../../test-data/source-filesystem-file-data'

const folders = map(prop('url'), folderData.folders.nodes)
const files = map(prop('url'), fileData.photos.nodes)

describe('files-folders getChildPaths', () => {  

  it('returns child directories of current path', () => {
    const path = '/base/level-one'
    const children = getChildPaths(path, folders)
    const expectedFolders =  [
      '/base/level-one/level-two',
      '/base/level-one/another-level-two'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns all top-level directories of root path', () => {
    const path = '/base'
    const children = getChildPaths(path, folders)
    const expectedFolders = [
      '/base/level-one',
      '/base/another-level-one',
      '/base/yet-another-level-one'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it('returns child files of current path', () => {
    const path = '/base/level-one'
    const children = getChildPaths(path, files)
    const expectedFiles =  [
      '/base/level-one/2.jpg'
    ]
    expect(children).toEqual(expectedFiles)
  })

  it('returns all files of root path', () => {
    const path = '/base'
    const children = getChildPaths(path, files)
    const expectedFiles = [
      '/base/1.jpg'
    ]
    expect(children).toEqual(expectedFiles)
  })

})

describe('files-folders getPagerData', () => { 
  const pagerFiles = [
    '/base/sub-folder/1.jpg',
    '/base/sub-folder/2.jpg',
    '/base/sub-folder/3.jpg',
    '/base/sub-folder/4.jpg',
    '/base/sub-folder/5.jpg',
    '/base/sub-folder/6.jpg',
    '/base/7.jpg',
    '/base/8.jpg',
    '/9.jpg'
  ] 

  it('returns pager data of 3 pages of files in a directory', () => {
    const path = '/base/sub-folder'
    const data = getPagerData(path, pagerFiles, 2)
    const expectedResult =  [
      {limit: 2, skip: 0, numPages: 3, currentPage: 1},
      {limit: 2, skip: 2, numPages: 3, currentPage: 2},
      {limit: 2, skip: 4, numPages: 3, currentPage: 3},
    ]
    expect(data).toEqual(expectedResult)
  })
  it('returns pager data of a single file in the root directory', () => {
    const path = '/'
    const data = getPagerData(path, pagerFiles, 5)
    const expectedResult =  [
      {limit: 5, skip: 0, numPages: 1, currentPage: 1},
    ]
    expect(data).toEqual(expectedResult)
  })
  it('returns pager data of a single folder in the root directory', () => {
    const path = ''
    const files = []
    const data = getPagerData(path, files, 5)
    const expectedResult =  [
      {limit: 5, skip: 0, numPages: 1, currentPage: 1},
    ]
    expect(data).toEqual(expectedResult)
  })
})