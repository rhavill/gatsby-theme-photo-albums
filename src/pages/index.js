import React from "react"
import Img from "gatsby-image"
import {graphql, Link} from "gatsby"
import Layout from '../components/Layout'
import {getChildren} from "../util/source-filesystem-children"
import toTitleCase from '../util/to-title-case'

export default ({data, location, pageContext}) => {
  const children = getChildren(location.pathname, data);
  const pathWithoutPageNumber = location.pathname.replace(/\/?\d+$/, '')
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 
    ? pathWithoutPageNumber 
    : pathWithoutPageNumber + '/' + (currentPage - 1).toString()
  const nextPage = pathWithoutPageNumber + '/' + (currentPage + 1).toString()

  return (
    <Layout path={location.pathname}>
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
                  <Img fixed={file.fixed} />
                </Link>
              </article>
            )
          })}
        </section>
      </div>
      <div className='pager'>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous Page
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page →
          </Link>
        )}
      </div>
      <br/>
    </Layout>
  );
}

export const query = graphql`
  query indexQuery($skip: Int!, $limit: Int!) {
    allDirectory {
      edges {
        node {
          relativePath
        }
      }
    }
    allFile(filter: {relativePath: {ne: "folder.png"}} limit: $limit skip: $skip) {
      edges {
        node {
          relativePath
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