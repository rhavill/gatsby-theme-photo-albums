module.exports = {
  pathPrefix: '/demo-albums',
  plugins: [
    {
      resolve: "gatsby-theme-photo-albums",
      options: {
        //albumsPath: "albums",
        //baseUrl: "base",
        folderIconDir: 'folder-icon',
      },
    },
  ],
}
