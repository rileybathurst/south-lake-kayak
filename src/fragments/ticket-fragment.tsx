import { graphql } from "gatsby";

export const query = graphql`
  fragment ticketFragment on STRAPI_TOUR {
    id
    name
    slug
    price
    peek
    excerpt
    start
    finish
    duration
    timeframe
    fitness
    sport

    ogimage {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }

    featured
  }
`;

// TODO: remove featured using it to test sort