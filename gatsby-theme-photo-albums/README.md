<h1 align="center">
  Gatsby Theme Photo Albums
</h1>

With this theme, you may add some photo albums to your [Gatsby](https://www.gatsbyjs.org) site. The albums are generated from folders and image files that are placed within a specific directory. To see the theme in action, check out this [demo](http://whereyouat.net/photo-albums-demo).

## Installation

1.  Set up a [Gatsby](https://www.gatsbyjs.org/docs/) site.

2.  Install the theme
    ```sh
    npm i gatsby-theme-photo-albums
    ```

    or

    ```sh
    yarn add gatsby-theme-photo-albums
    ```

3.  Add the theme to your `gatsby-config.js`:
    ```js
    module.exports = {
      plugins: [
        {
          resolve: "gatsby-theme-photo-albums",
        }
      ]
    }
    ```
## Configuration

If you want to change the default behavior, add some options to `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-photo-albums",
      options: {
        baseUrl: '/', // the path to the photo albums from your site (default: '/')
        photosPerPage: 15, // the number of photos to display on a page (default: 15)
        albumsPath: 'photo-albums', // the directory where you put photo albums (default: 'photo-albums')
        folderIconDir: folder-icon // the directory containing a custom folder icon (do not specify the file name)
      }
    }
  ]
}
```

## Adding Photo Albums
  
Add some folders and image files to your albums directory. The default directory is `photo-albums`, but this can be changed with the `albumsPath` configuration option. Each folder you create inside the albums directory is a photo album.

## Customizing Styles

This theme utilizes [gatsby-plugin-theme-ui](https://www.gatsbyjs.org/packages/gatsby-plugin-theme-ui), which makes it easy to override CSS styles provided by the theme. If you want to change the styles provided by this theme, create a `src/gatsby-theme-photo-albums` directory in your site and add a file called `theme.js` to the directory. To override the styles, you will want to do a deep merge of the original styles object. One way to do this merge is to use [Lodash merge function](https://lodash.com/docs/#merge). 

To install the Lodash merge function:

  ```sh
  npm i lodash.merge
  ```

  or

  ```sh
  yarn add lodash.merge
  ```

Here is an example of a style customization, where the default background color is changed, by using the Lodash merge function in the `src/gatsby-theme-photo-albums/theme.js` file:

```js
import merge from 'lodash.merge'
import baseTheme from 'gatsby-theme-photo-albums/src/theme'

export const theme = merge({}, baseTheme, {
  colors: {
    background: '#eee',
  },
})

export default theme
```

The default styles can be seen in the `src/theme.js` file of the gastsby-theme-photo-albums theme.

## Component Shadowing

Thanks to Gatsby's awesome [Component Shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/) functionality, you may override any component provided by `gatsby-theme-photo-albums`. For example, you may change the text of the "Next Page" pagination link, by implementing your own custom PreviousPageText component. To override PreviousPageText, add the following code to a file called `src/gatsby-theme-photo-albums/components/pagination/PreviousPageText.js`:

```js
import React from 'react'

const NextPageText = () => 
  <span className='next-page'>
    Siguiente →
  </span>

export default NextPageText
```
