import React from "react"
import Img from "gatsby-image"
import {graphql, Link} from "gatsby"
import Header from '../components/Header'
import getChildren from "../util/source-filesystem-children"
import toTitleCase from '../util/to-title-case'

export default ({data, location/*, pageContext*/}) => {
  const children = getChildren(location.pathname, data);
  console.log('index children', children);
  return (
    <div className='wrapper'>
      <Header path={location.pathname}/>
      <div className="container page">
        <section>
          {children.folders.map((folder, i) => {
            const title = toTitleCase(folder.replace(/.*\/([^/]+)$/, '$1'))
            return (
              <Link key={i} to={folder}>
                <article className='folder'>
                  <Img fixed={data.file.childImageSharp.fixed} alt={title} />
                  <div className="folder-title">{title}</div>
                </article>
              </Link>
            )
          })}
          {children.files.map((file, i) => {
            return (
              <Link key={i} to={file.fsPath}>
                <article className='file'>
                  <Img fixed={{src: file.src, width: file.width, height: file.height}} />
                </article>
              </Link>
            )
          })}
        </section>
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allDirectory {
      edges {
        node {
          base
          relativePath
        }
      }
    }
    allFile(filter: {relativePath: {ne: "folder.png"}}) {
      edges {
        node {
          relativePath
          relativeDirectory
          childImageSharp {
            fixed(width: 250, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    file(relativePath: { eq: "folder.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`