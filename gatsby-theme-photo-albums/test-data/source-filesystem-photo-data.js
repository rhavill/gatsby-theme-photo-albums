const photoData = JSON.parse(`
  {
    "data": {
      "site": {
        "pathPrefix": "/path-prefix"
      },
      "photo": {
        "childImageSharp": {
          "fixed": {
            "srcSet": "/static/blah/blah/1.jpg 1x",
            "src": "/static/blah/blah/1.jpg",
            "width": 250,
            "height": 250
          }
        }
      }
    }
  }`)

export default photoData