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
          childImageSharp: {
            fixed: {
              src: '/static/blah/blah/1.jpg',
              width: 250,
              height: 250
            }
          },
          relativePath: '1.jpg',
          relativeDirectory: ''
        }
      },
      {
        node: {
          childImageSharp: {
            fixed: {
              src: '/static/blah/blah/2.jpg',
              width: 250,
              height: 250
            }
          },
          relativePath: 'level-one/2.jpg',
          relativeDirectory: 'level-one'
        }
      },
      {
        node: {
          childImageSharp: {
            fixed: {
              src: '/static/blah/blah/3.jpg',
              width: 250,
              height: 250
            }
          },
          relativePath: 'level-one/level-two/3.jpg',
          relativeDirectory: 'level-one/level-two'
        }
      },
      {
        node: {
          childImageSharp: {
            fixed: {
              src: '/static/blah/blah/4.jpg',
              width: 250,
              height: 250
            }
          },
          relativePath: 'level-one/another-level-two/4.jpg',
          relativeDirectory: 'level-one/another-level-two'
        }
      },
      {
        node: {
          childImageSharp: {
            fixed: {
              src: '/static/blah/blah/5.jpg',
              width: 250,
              height: 250
            }
          },
          relativePath: 'level-one/level-two/level-three/5.jpg',
          relativeDirectory: 'level-one/level-two/level-three'
        }
      },
    ]
  }
}

export default filesystemData