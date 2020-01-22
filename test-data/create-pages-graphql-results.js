const queryResults = `{
  "data": {
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
        },
        {
          "relativePath": "2019-puerto-rico/san-juan",
          "url": "/base/2019-puerto-rico/san-juan"
        }
      ]
    },
    "photos": {
      "nodes": [
        {
          "relativeDirectory": "2019-puerto-rico/jayuya",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg",
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg"
        },
        {
          "relativeDirectory": "2019-puerto-rico/jayuya",
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg",
          "url": "/base/2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg"
        },
        {
          "relativeDirectory": "2019-puerto-rico/san-juan",
          "relativePath": "2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg",
          "url": "/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg"
        },
        {
          "relativeDirectory": "2019-puerto-rico/san-juan",
          "relativePath": "2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg",
          "url": "/base/2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg"
        }
      ]
    }
  }
}`

module.exports = JSON.parse(queryResults)