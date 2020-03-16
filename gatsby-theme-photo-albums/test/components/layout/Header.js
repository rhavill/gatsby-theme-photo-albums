import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Header from '../../../src/components/layout/Header'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header path='/' />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
