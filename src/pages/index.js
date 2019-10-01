import React from "react";
import {graphql} from "gatsby"
import Header from '../components/Header';
import getChildren from "../util/source-filesystem-children";

export default ({data, location/*, pageContext*/}) => {
  const children = getChildren(location.pathname, data);
  return (
    <div>
        <Header path={location.pathname}/>
      <div className="container">
        <section>
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