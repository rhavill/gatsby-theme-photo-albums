import React from 'react'
import {cleanup, renderer} from '../../src/util/test-utils'
import MainContent from '../../src/styles/MainContent'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('MainContent styles', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MainContent><div>hello</div></MainContent>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
