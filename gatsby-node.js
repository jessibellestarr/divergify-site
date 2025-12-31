const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const rawSlug = createFilePath({ node, getNode, basePath: "content/blog" });
    const slug = `/blog${rawSlug}`; // ensure posts live under /blog/
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields { slug }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(result.errors);
    return;
  }
  const posts = result.data.allMarkdownRemark.edges;
  const template = path.resolve("src/templates/blog-post.js");
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: template,
      context: { slug: node.fields.slug },
    });
  });
};
