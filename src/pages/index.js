import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnail from '../components/Thumbnail'
import Pager from '../components/Pager'
import {getChildren} from "../util/source-filesystem-children"

export default ({data, location, pageContext}) => {
  const path = location.pathname
  const children = getChildren(path, data)
  const {currentPage, numPages} = pageContext

  return (
    <Layout path={path}>
      <div className="listing-page">
        <section>
          <Folders path={path} data={data} />
          {children.files.map((file, i) => 
            <Thumbnail key={i} fileData={file} />
          )}
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
    allFile(filter: {relativePath: {ne: "folder.png"}} limit: $limit skip: $skip) {
      ...ThumbnailFragment
    }
      ...FoldersFragment
  }
`