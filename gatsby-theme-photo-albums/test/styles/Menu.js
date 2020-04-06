import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Menu from '../../src/styles/Menu'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Menu styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Menu><div>hello</div></Menu>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
