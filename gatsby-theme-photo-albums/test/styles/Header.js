import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Header from '../../src/styles/Header'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Header styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header><div>hello</div></Header>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
