import React from 'react'
import renderer from 'react-test-renderer'
import {cleanup, render} from '@testing-library/react'
import Header from './Header'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header path='/' />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('displays "title case" text for path components', () => {
    const {getByText} = render(
      <Header path='/first-dir/second-dir' />
    )
    expect(getByText('First Dir')).toBeTruthy()
    expect(getByText('Second Dir')).toBeTruthy()
  })
})
