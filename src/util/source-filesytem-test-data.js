const filesystemData =  {
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
  },
  allFile: {
    edges: [
      {
        node: {
          relativePath: '1.jpg',
          relativeDirectory: ''
        }
      },
      {
        node: {
          relativePath: 'level-one/2.jpg',
          relativeDirectory: 'level-one'
        }
      },
      {
        node: {
          relativePath: 'level-one/level-two/3.jpg',
          relativeDirectory: 'level-one/level-two'
        }
      },
      {
        node: {
          relativePath: 'level-one/another-level-two/4.jpg',
          relativeDirectory: 'level-one/another-level-two'
        }
      },
      {
        node: {
          relativePath: 'level-one/level-two/level-three/5.jpg',
          relativeDirectory: 'level-one/level-two/level-three'
        }
      },
    ]
  }
}

export default filesystemData