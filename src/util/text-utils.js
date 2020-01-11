import compose from 'ramda/src/compose'
import curry from 'ramda/src/curry'
import path from 'ramda/src/path'
import replace from 'ramda/src/replace'

const toTitleCase = text => 
  text.toLowerCase()
    .split(/[-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

const removeFileExtension = replace(/^(.+)\.[^.]+$/, '$1')

const pathToFile = replace(/.*\/([^/]+$)/, '$1')

const pathToFileTitle = compose(toTitleCase, removeFileExtension, pathToFile)

const removePathPrefix = data => replace(
  path(['site', 'pathPrefix'], data), 
  ''
)

const removeBasePath = (basePath, path) => {
  const newPath = replace(
    // Remove trailing slash (if it exists)
    basePath.replace(/\/$/, ''), 
    ''
  )(path)
  return newPath
}

const prependBasePath = curry((basePath, path) => {
  // Remove leading slash and trailing slash (if they exist)
  const base = basePath.replace(/^\//, '').replace(/\/$/, '')
  if (base) {
    return `/${base}${path}`
  }
  return path
})

const gatsbyPathnameToChildComponentPath = (basePath, pathname, graphqlData) => {
  const path = compose(removePathPrefix(graphqlData), decodeURIComponent)(pathname)
  return removeBasePath(basePath, path)
}

export {
  pathToFile,
  pathToFileTitle,
  prependBasePath,
  removeFileExtension,
  toTitleCase,
  gatsbyPathnameToChildComponentPath,
}