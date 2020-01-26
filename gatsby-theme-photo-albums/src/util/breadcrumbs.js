import compose from 'ramda/src/compose'
import {removeFileExtension, toTitleCase} from './url-text'

const breadcrumbs = (path) => {
  // Set path to empty string for root directory. 
  // Also, remove trailing slash (if it exists) for consistency.
  const parts = path === '/' ? [''] : path.replace(/\/$/, '').split('/')
  return parts
    .map((folder, i) => ({
      // convert to "title case" and remove file extension
      title: folder === '' 
        ? '' 
        : compose(toTitleCase, removeFileExtension)(folder),
      path: folder === '' ? '/' : parts.filter((part, j) => j <= i).join('/') 
    }))
}

export default breadcrumbs