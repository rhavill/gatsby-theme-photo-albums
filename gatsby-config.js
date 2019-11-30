const themeConfig = require('./theme-config')
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = ({albumsPath = themeConfig.defaultAlbumsPath}) => ({
  pathPrefix: '/photo-gallery',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'photos',
        path: albumsPath,
        useMozJpeg: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/images/`, // eslint-disable-line no-undef
      },
    },
    'gatsby-transformer-sharp', 
    'gatsby-plugin-sharp',
  ]
})
