const path = require("node:path");
// import type { Actions } from "gatsby";

// Log out information after a build is done
/* interface ReporterTypes {
  reporter: {
    info: (message: string) => void;
  };
} */
exports.onPostBuild = ({ reporter }: ReporterTypes) => {
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
exports.createPages = async ({ graphql, actions }: CreatePagesTypes) => {
  /*   interface Actions {
    createTour: (tour: Tour) => void;
  } */
  const { createPage } = actions;

  const getStrapiTour = await graphql(`
    query {
      allStrapiTour(filter: { locale: { slug: { eq: "south-lake" } } }) {
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
};
