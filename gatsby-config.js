module.exports = {
  siteMetadata: {
    title: `Divergify`,
    siteUrl: `https://divergify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};

