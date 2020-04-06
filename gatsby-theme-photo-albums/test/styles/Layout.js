import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import Layout from '../../src/styles/Layout'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Layout styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Layout><div>hello</div></Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
