// building this as .ts without types means it didnt build

const path = require("node:path");
// import type { Actions } from "gatsby";

// Log out information after a build is done
/* interface ReporterTypes {
  reporter: {
    info: (message: string) => void;
  };
} */
exports.onPostBuild = ({ reporter }) => {
  reporter.info("Your Gatsby site has been built!");
  /* interface CreatePagesTypes {
  graphql: (query: string) => Promise<GraphQLResult>;
  actions: Actions; */
};

/* interface GraphQLResult {
  data: {
    allStrapiTour: {
      nodes: {
        slug: string;
        node: {
          slug: string;
        }
      }[];
    };
  };
} */
exports.createPages = async ({ graphql, actions }) => {
  /*   interface Actions {
    createTour: (tour: Tour) => void;
  } */
  const { createPage } = actions;

  const getStrapiTour = await graphql(`
    query {
      allStrapiTour(filter: { local: { slug: { eq: "south-tahoe" } } }) {
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
        filter: { local: { elemMatch: { slug: { eq: "south-tahoe" } } } }
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
