import { graphql } from "gatsby";

export const query = graphql`
  fragment BrandListFragment on STRAPI_BRAND {
    id
    name
    slug
    svg
    retail {
      title
      slug
      sport {
        slug
      }
    }
  }
`;
