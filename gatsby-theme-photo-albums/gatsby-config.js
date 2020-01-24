const defaults = require('./default-config')
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = ({
  albumsPath = defaults.albumsPath, 
  folderIconDir = defaults.folderIconDir}) => ({
  // pathPrefix: '/photo-albums',
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'gtpaPhotos',
        path: albumsPath,
        useMozJpeg: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'gtpaFolderIcon',
        path: folderIconDir, 
      },
    },
    'gatsby-transformer-sharp', 
    'gatsby-plugin-sharp',
  ]
})
