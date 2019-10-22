import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup} from '@testing-library/react'
import Thumbnail from './Thumbnail'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const fileData = {
  childImageSharp: {
    fixed: {
      width: 250,
      height: 250,
      src: '/static/hash/f17d3/folder.png',
      srcSet: '/static/hash/f17d3/folder.png 1x',
    }
  }
}

describe('Thumbnail', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Thumbnail path='/level-one/level-two/3.jpg' imageData={fileData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
