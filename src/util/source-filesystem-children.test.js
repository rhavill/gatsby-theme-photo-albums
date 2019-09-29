import getChildren from './source-filesystem-children'

describe("source-filesystem-children", () => {
  
  const fileData = {
    allDirectory: {
      edges: [
        {
          node: {
            relativePath: ''
          }
        },
        {
          node: {
            relativePath: 'level-one'
          }
        },
        {
          node: {
            relativePath: 'another-level-one'
          }
        },
        {
          node: {
            relativePath: 'yet-another-level-one'
          }
        },
        {
          node: {
            relativePath: 'level-one/level-two'
          }
        },
        {
          node: {
            relativePath: 'level-one/another-level-two'
          }
        },
        {
          node: {
            relativePath: 'level-one/level-two/level-three'
          }
        },
      ]
    }
  }

  it("returns child directories of current path", () => {
    const path = '/level-one'
    const children = getChildren(path, fileData)
    const expectedChildren = {
      folders: [
        '/level-one/level-two',
        '/level-one/another-level-two'
      ],
      files: []
    }
    expect(children).toEqual(expectedChildren)
  })

  it("returns all top-level directories of root path", () => {
    const path = ''
    const children = getChildren(path, fileData)
    const expectedChildren = {
      folders: [
        '/level-one',
        '/another-level-one',
        '/yet-another-level-one'
      ],
      files: []
    }
    expect(children).toEqual(expectedChildren)
  })
  
})