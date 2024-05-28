/* const path = require(`path`);
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info('Your Gatsby site has been built!');
};

exports.createTours = async ({ graphql, actions }) => {
  const { createTour } = actions
  const blogPostTemplate = path.resolve('src/views/tour-view.tsx')
  const result = await graphql(`
    query {
      allStrapiTour(filter: {locale: {slug: {eq: "south-lake"}}}) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)
  result.data.allSamplePages.edges.forEach(edge => {
    createPage({
      path: `${edge.node.slug}`,
      component: blogPostTemplate,
      context: {
        title: edge.node.title,
      },
    })
  })
} */
