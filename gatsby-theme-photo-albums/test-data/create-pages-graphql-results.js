const queryResults = {
  data: {
    folders: {
      nodes: [
        {
          relativeDirectory: '..',
          relativePath: '',
          url: '/base/'
        },
        {
          relativeDirectory: '',
          relativePath: '2019-puerto-rico',
          url: '/base/2019-puerto-rico'
        },
        {
          relativeDirectory: '2019-puerto-rico',
          relativePath: '2019-puerto-rico/jayuya',
          url: '/base/2019-puerto-rico/jayuya'
        },
        {
          relativeDirectory: '2019-puerto-rico',
          relativePath: '2019-puerto-rico/san-juan',
          url: '/base/2019-puerto-rico/san-juan'
        }
      ]
    },
    photos: {
      nodes: [
        {
          absolutePath: `${__dirname}/dummy.jpg`,
          relativeDirectory: '2019-puerto-rico/jayuya',
          relativePath: '2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg',
          url: '/base/2019-puerto-rico/jayuya/IMG_20190814_102958452-small.jpg'
        },
        {
          absolutePath: `${__dirname}/dummy.jpg`,
          relativeDirectory: '2019-puerto-rico/jayuya',
          relativePath: '2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg',
          url: '/base/2019-puerto-rico/jayuya/IMG_20190814_113735817-small.jpg'
        },
        {
          absolutePath: `${__dirname}/dummy.jpg`,
          relativeDirectory: '2019-puerto-rico/san-juan',
          relativePath: '2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg',
          url: '/base/2019-puerto-rico/san-juan/IMG_20190801_180122560_HDR-small.jpg'
        },
        {
          absolutePath: `${__dirname}/dummy.jpg`,
          relativeDirectory: '2019-puerto-rico/san-juan',
          relativePath: '2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg',
          url: '/base/2019-puerto-rico/san-juan/P_20190412_061017_vHDR_Auto-small.jpg'
        },
      ]
    }
  }
}

module.exports = queryResults