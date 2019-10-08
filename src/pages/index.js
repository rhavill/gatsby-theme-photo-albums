import React from "react"
import Img from "gatsby-image"
import {graphql, Link} from "gatsby"
import Layout from '../components/Layout'
import getChildren from "../util/source-filesystem-children"
import toTitleCase from '../util/to-title-case'

export default ({data, location/*, pageContext*/}) => {
  const children = getChildren(location.pathname, data);
  console.log('index children', children);
  return (
    <Layout location={location}>
      <div className="listing-page">
        <section>
          {children.folders.map((folder, i) => {
            const title = toTitleCase(folder.replace(/.*\/([^/]+)$/, '$1'))
            return (
              <article key={i} className='folder'>
                <Link to={folder}>
                  <Img fixed={data.file.childImageSharp.fixed} alt={title} />
                  <div className="folder-title">{title}</div>
                </Link>
              </article>
            )
          })}
          {children.files.map((file, i) => {
            return (
              <article key={i} className='file'>
                <Link to={file.fsPath}>
                  <Img fixed={{src: file.src, width: file.width, height: file.height}} />
                </Link>
              </article>
            )
          })}
        </section>
      </div>
    </Layout>
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