import React from 'react'
import {cleanup, render, renderer} from '../../../src/util/test-utils'
import Layout from '../../../src/components/layout/Layout'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Layout', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Layout path='/'><div>hello</div></Layout>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays child nodes', () => {
    const {getByText} = render(
      <Layout path='/'><div>hello</div></Layout>
    )
    expect(getByText('hello')).toBeTruthy()
  })
})
