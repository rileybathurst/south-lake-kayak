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
    featured

    ogimage {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }
  }
`;
