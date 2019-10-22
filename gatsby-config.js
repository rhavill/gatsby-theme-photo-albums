/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    photosPerPage: 15,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'photos',
        path: `${__dirname}/photos/`, // eslint-disable-line no-undef
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
}
