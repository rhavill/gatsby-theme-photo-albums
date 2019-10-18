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
    # Ideally, the next line of this query would be part of ThumbnailsFragment, 
    # but putting the line in that fragment caused the error: 'Variable "$skip" 
    # is never used in operation "indexQuery"'
    photos: allFile(filter: {relativePath: {ne: "folder.png"}} limit: $limit skip: $skip) {
      ...ThumbnailsFragment
    }
    ...FoldersFragment
  }
`