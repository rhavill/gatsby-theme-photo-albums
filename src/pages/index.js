import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnails from '../components/Thumbnails'
import Pager from '../components/Pager'

export default ({data, location, pageContext}) => {
  const path = location.pathname
  const {currentPage, numPages} = pageContext

  return (
    <Layout path={path}>
      <div className="listing-page">
        <section>
          <Folders path={path} data={data} />
          <Thumbnails path={path} data={data} />
        </section>
      </div>
      <Pager path={path} currentPage={currentPage} numPages={numPages} />
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
    # This dummy query is a workaround for the error: Variable "$skip" is never 
    # used in operation "indexQuery"
    dummy: allFile(limit: $limit skip: $skip) {
      nodes {
        relativePath
      }
    }
    ...FoldersFragment
    ...ThumbnailsFragment
  }
`