import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Pager from '../../src/styles/Pager'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Pager styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Pager><div>hello</div></Pager>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
