const breadcrumbs = path => {
  const parts = path === '/' ? [''] : path.replace(/\/$/, '').split('/')
  return parts
    .map((folder, i) => ({
      title: folder === '' ? 'Home' : toTitleCase(folder),
      path: folder === '' ? '/' : parts.filter((part, j) => j <= i).join('/') 
    }))
}

const toTitleCase = text => 
  text.toLowerCase()
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    export default breadcrumbs