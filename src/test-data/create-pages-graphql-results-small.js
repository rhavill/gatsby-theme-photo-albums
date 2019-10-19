const queryResults = `{
  "data": {
    "site": {
      "siteMetadata": {
        "photosPerPage": 15
      }
    },    
    "folders": {
      "nodes": [
        {
          "relativePath": ""
        },
        {
          "relativePath": "2019-puerto-rico"
        },
        {
          "relativePath": "2019-puerto-rico/jayuya"
        },
        {
          "relativePath": "2019-puerto-rico/san-juan"
        }
      ]
    },
    "photos": {
      "nodes": [
        {
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg"
        },
        {
          "relativePath": "2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg"
        },
        {
          "relativePath": "2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg"
        },
        {
          "relativePath": "2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg"
        }
      ]
    }
  }
}`

module.exports = JSON.parse(queryResults)