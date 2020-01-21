const fileData = {
  photos: {
    nodes: [
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/1.jpg 1x',
          src: '/static/blah/blah/1.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: '1.jpg',
      url: '/base/1.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/2.jpg 1x',
          src: '/static/blah/blah/2.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/2.jpg', 
      url: '/base/level-one/2.jpg'},
      {childImageSharp: {
        fixed: {
          srcSet: '/static/blah/blah/3.jpg 1x',
          src: '/static/blah/blah/3.jpg',
          width: 250,
          height: 250
        }
      },
      relativePath: 'level-one/level-two/3.jpg',
      url: '/base/level-one/level-two/3.jpg'}
    ]
  }
}

export default fileData