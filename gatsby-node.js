// building this as .ts without types means it didnt build

const path = require("node:path");
exports.onPostBuild = ({ reporter }) => {
  reporter.info("Your Gatsby site has been built!");
};

exports.createPages = async ({ graphql, actions }) => {
  /*   interface Actions {
    createTour: (tour: Tour) => void;
  } */
  const { createPage } = actions;

  const getStrapiTour = await graphql(`
    query {
      allStrapiTour(filter: { branch: { slug: { eq: "south-tahoe" } } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  for (const { node } of getStrapiTour.data.allStrapiTour.edges) {
    createPage({
      path: `/tours/${node.slug}`,
      component: path.resolve("src/views/tour-view.tsx"),
      context: {
        slug: node.slug,
      },
    });
  }

  const getStrapiTeam = await graphql(`
    query {
      allStrapiTeam(
        filter: { branches: { elemMatch: { slug: { eq: "south-tahoe" } } } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  for (const { node } of getStrapiTeam.data.allStrapiTeam.edges) {
    createPage({
      path: `/about/team/${node.slug}`,
      component: path.resolve("src/views/team-view.tsx"),
      context: {
        slug: node.slug,
      },
    });
  }


};
