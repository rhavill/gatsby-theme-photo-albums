import React from "react"
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
                <article className='folder' key={i}>
                  {title}
                </article>
              </Link>
            )
          })}
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
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
    allFile {
      edges {
        node {
          relativePath
          relativeDirectory
        }
      }
    }
  }
`