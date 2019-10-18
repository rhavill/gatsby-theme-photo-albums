import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import {getPagerData} from './source-filesystem-pager-data'
import fileData from '../test-data/source-filesystem-file-data'

const files = map(prop('relativePath'), fileData.photos.nodes)
describe("source-filesystem-pager-data", () => {  
  it("returns pager data of 4 pages of files in a directory", () => {
    const path = 'level-one/level-two/level-three'
    const data = getPagerData(path, files, 5)
    const expectedResult =  [
      {limit: 5, skip: 0, numPages: 4, currentPage: 1},
      {limit: 5, skip: 5, numPages: 4, currentPage: 2},
      {limit: 5, skip: 10, numPages: 4, currentPage: 3},
      {limit: 5, skip: 15, numPages: 4, currentPage: 4},
    ]
    expect(data).toEqual(expectedResult)
  })
  it("returns pager daa of a single file in the root directory", () => {
    const path = ''
    const data = getPagerData(path, files, 5)
    const expectedResult =  [
      {limit: 5, skip: 0, numPages: 1, currentPage: 1},
    ]
    expect(data).toEqual(expectedResult)
  })
  
})