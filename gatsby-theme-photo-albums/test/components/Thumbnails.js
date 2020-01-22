import map from 'ramda/src/map'
import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Thumbnails from '../../src/components/Thumbnails'
import fileData from '../../test-data/source-filesystem-file-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const files = map(node => ({
  url: node.url,
  imageData: node.childImageSharp.fixed
}), fileData.photos.nodes)

describe('Thumbnails', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Thumbnails files={files} currentPage={1}  />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  // it('displays the correct number of thumbnail images', () => {
  //   const {getAllByTestId} = render(
  //     <Thumbnails files={files} currentPage={2} />
  //   )
  //   expect(getAllByTestId('file').length).toBe(17)
  // })

})