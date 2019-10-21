import compose from 'ramda/src/compose'
import replace from 'ramda/src/replace'

const toTitleCase = text => 
  text.toLowerCase()
    .split(/[-_]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

const removeFileExtension = replace(/^(.+)\.[^.]+$/, '$1')

const pathToFile = replace(/.*\/([^/]+$)/, '$1')

const pathToFileTitle = compose(toTitleCase, removeFileExtension, pathToFile)

export {
  pathToFile,
  pathToFileTitle,
  removeFileExtension,
  toTitleCase,
}