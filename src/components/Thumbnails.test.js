import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup} from '@testing-library/react';
import Thumbnails from './Thumbnails'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const fileData = {
  photos: {
    nodes: [
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/1.jpg 1x',
          src: '/static/blah/blah/1.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: '1.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/2.jpg 1x',
          src: '/static/blah/blah/2.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/2.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/3.jpg 1x',
          src: '/static/blah/blah/3.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/level-two/3.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/4.jpg 1x',
          src: '/static/blah/blah/4.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/another-level-two/4.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/5.jpg 1x',
          src: '/static/blah/blah/5.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/level-two/level-three/5.jpg',
      relativeDirectory: 'level-one/level-two/level-three'},
    ]
  }
}

describe("Thumbnails", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Thumbnails path='/level-one' data={fileData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})