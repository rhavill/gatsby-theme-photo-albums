import toTitleCase from './to-title-case';

const breadcrumbs = (path, rootTitle = 'Home') => {
  // Set path to empty string for root directory. 
  // Also, remove trailing slash (if it exists) for consistency.
  const parts = path === '/' ? [''] : path.replace(/\/$/, '').split('/')
  return parts
    .map((folder, i) => ({
      // convert to "title case" and remove file extension
      title: folder === '' ? rootTitle : toTitleCase(folder).replace(/\.[^/.]+$/, ''),
      path: folder === '' ? '/' : parts.filter((part, j) => j <= i).join('/') 
    }))
}

export default breadcrumbs