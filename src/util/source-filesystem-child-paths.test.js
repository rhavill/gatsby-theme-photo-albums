import getChildPaths from './source-filesystem-child-paths'

describe("source-filesystem-child-paths", () => {  

  const directoryData =  [
    '',
    'level-one',
    'another-level-one',
    'yet-another-level-one',
    'level-one/level-two',
    'level-one/another-level-two'
  ]

  it("returns child directories of current path", () => {
    const path = '/level-one'
    const children = getChildPaths(path, directoryData)
    const expectedFolders =  [
      '/level-one/level-two',
      '/level-one/another-level-two'
    ]
    expect(children).toEqual(expectedFolders)
  })

  it("returns all top-level directories of root path", () => {
    const path = ''
    const children = getChildPaths(path, directoryData)
    const expectedFolders = [
      '/level-one',
      '/another-level-one',
      '/yet-another-level-one'
    ]
    expect(children).toEqual(expectedFolders)
  })

})