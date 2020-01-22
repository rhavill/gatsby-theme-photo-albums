const data = `
{
  "data": {
    "site": {
      "pathPrefix": "/path-prefix"
    },
    "photos": {
      "nodes": [
        {
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg",
          "childImageSharp": {
            "fixed": {
              "src": "/static/bd5e73a4e4ef1e6c999f05a63948fb15/284df/IMG_20190814_113735817-small.jpg",
              "srcSet": "/static/bd5e73a4e4ef1e6c999f05a63948fb15/284df/IMG_20190814_113735817-small.jpg 1x",
              "width": 250,
              "height": 250
            }
          }
        },
        {
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_104325636-small.jpg",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_104325636-small.jpg",
          "childImageSharp": {
            "fixed": {
              "src": "/static/097fee76750829e6093dd01b5cf77350/284df/IMG_20190814_104325636-small.jpg",
              "srcSet": "/static/097fee76750829e6093dd01b5cf77350/284df/IMG_20190814_104325636-small.jpg 1x",
              "width": 250,
              "height": 250
            }
          }
        },
        {
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_103213316-small.jpg",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_103213316-small.jpg",
          "childImageSharp": {
            "fixed": {
              "src": "/static/62d1e49090d0f8a33026172e988f62ef/284df/IMG_20190814_103213316-small.jpg",
              "srcSet": "/static/62d1e49090d0f8a33026172e988f62ef/284df/IMG_20190814_103213316-small.jpg 1x",
              "width": 250,
              "height": 250
            }
          }
        },
        {
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_113817195-small.jpg",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_113817195-small.jpg",
          "childImageSharp": {
            "fixed": {
              "src": "/static/1d5338456eb7a30531121a2e30aa10ad/284df/IMG_20190814_113817195-small.jpg",
              "srcSet": "/static/1d5338456eb7a30531121a2e30aa10ad/284df/IMG_20190814_113817195-small.jpg 1x",
              "width": 250,
              "height": 250
            }
          }
        }
      ]
    },
    "folderIcon": {
      "childImageSharp": {
        "fixed": {
          "src": "/static/b75d8bd08d0e30f3925cc6187ddc8b84/f17d3/folder.png",
          "srcSet": "/static/b75d8bd08d0e30f3925cc6187ddc8b84/f17d3/folder.png 1x",
          "width": 250,
          "height": 250
        }
      }
    },
    "folders": {
      "nodes": [
        {
          "relativePath": "",
          "url": "/base/"
        },
        {
          "relativePath": "2019-puerto-rico",
          "url": "/base/2019-puerto-rico"
        },
        {
          "relativePath": "2019-puerto-rico/jayuya",
          "url": "/base/2019-puerto-rico/jayuya"
        }
      ]
    }
  }
}`

module.exports = JSON.parse(data)