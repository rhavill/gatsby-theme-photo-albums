import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Photo from '../../src/styles/Photo'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Photo styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Photo height={600}><div>hello</div></Photo>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
