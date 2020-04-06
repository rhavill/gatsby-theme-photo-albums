import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Index from '../../src/styles/Index'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Index styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Index><div>hello</div></Index>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
