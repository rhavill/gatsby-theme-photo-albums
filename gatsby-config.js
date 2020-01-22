const defaults = require('./theme-config')
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = ({albumsPath = defaults.albumsPath}) => ({
  // pathPrefix: '/photo-gallery',
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
        path: `${__dirname}/folder-icon/`, // eslint-disable-line no-undef
      },
    },
    'gatsby-transformer-sharp', 
    'gatsby-plugin-sharp',
  ]
})
