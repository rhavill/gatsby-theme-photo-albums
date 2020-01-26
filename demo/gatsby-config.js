module.exports = {
  pathPrefix: '/photo-albums-demo',
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
