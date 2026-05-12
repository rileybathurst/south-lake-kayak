import { graphql } from "gatsby";

export const query = graphql`
  fragment BookNowFragment on STRAPI_BRANCH {
    name
    peek_base
  }
`;
