import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup} from '@testing-library/react';
import Thumbnails from './Thumbnails'
import fileData from '../test-data/source-filesystem-file-data'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Thumbnails", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Thumbnails path='/level-one' data={fileData} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})