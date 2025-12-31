import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default function BlogPage({ data }) {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <h1>Blog</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(({ node }) => (
        <div key={node.id} style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ marginBottom: ".25rem" }}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </h2>
          {node.excerpt && <p>{node.excerpt}</p>}
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
