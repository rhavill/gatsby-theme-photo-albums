import mergeDeepRight from 'ramda/src/mergeDeepRight'
import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'emotion-theming'

import theme from '../theme'

const create = (element, options) => {
  return renderer.create(
    <ThemeProvider theme={theme}>{element}</ThemeProvider>, options
  )
}

const customRenderer = mergeDeepRight(renderer, {create})

const Wrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options })

// re-export everything from React Testing Library
export * from '@testing-library/react'

// override react testing library render method and custom react-test-renderer r
export { customRender as render, customRenderer as renderer }