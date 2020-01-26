module.exports = {
  pathPrefix: '/demo-albums',
  plugins: [
    {
      resolve: 'gatsby-theme-photo-albums',
      options: {
        // albumsPath: 'albums',
        // baseUrl: 'albums',
        folderIconDir: 'folder-icon',
        // photosPerPage: 15,
      },
    },
  ],
}
