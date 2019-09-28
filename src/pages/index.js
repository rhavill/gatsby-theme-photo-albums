import React from "react";
import { graphql } from "gatsby"
import Header from '../components/Header';
import { getChildren } from "../util/source-filesystem-children";


export default ({ data, location/*, pageContext*/ }) => {
  const children = getChildren(location.pathname, data);
  return (
    <div>
      <Header path={location.pathname}/>
      <div>hello index</div>
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
          base
          name
          dir
          relativeDirectory
        }
      }
    }
  }
`