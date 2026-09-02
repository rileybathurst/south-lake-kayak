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

    
  }
`;

// TODO: I had the eclipse as a retail explaination but now we dont so its on the page but its not linked and less clear
/* retail {
  slug
  sport {
    slug
  }
  brand {
    slug
  }
} */