import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Folder from '../components/Folder'
import Thumbnail from '../components/Thumbnail'
import Pager from '../components/Pager'
import {getChildren} from "../util/source-filesystem-children"

export default ({data, location, pageContext}) => {
  const children = getChildren(location.pathname, data);
  const {currentPage, numPages} = pageContext

  return (
    <Layout path={location.pathname}>
      <div className="listing-page">
        <section>
          {children.folders.map((folder, i) => 
            <Folder key={i} path={folder} 
            fixedImageData={data.file} />
          )}
          {children.files.map((file, i) => 
            <Thumbnail key={i} fileData={file} />
          )}
        </section>
      </div>
      <Pager path={location.pathname} currentPage={currentPage} numPages={numPages} />
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
    file(relativePath: { eq: "folder.png" }) {
      ...FolderFragment
    }
  }
`