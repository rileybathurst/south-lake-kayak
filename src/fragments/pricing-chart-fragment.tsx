import { graphql } from "gatsby";

// these have to be on a specific type
export const query = graphql`
  fragment PricingChartFragment on STRAPI_RENTAL_RATE {
    id
    item
    oneHour
    threeHour
    fullDay
    pedalAdd

    branches {
      slug
    }

    retail {
      slug
      sport {
        slug
      }
      brand {
        slug
      }
    }
  }
`;
