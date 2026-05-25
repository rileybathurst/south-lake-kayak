import { graphql } from "gatsby";

// these have to be on a specific type
export const query = graphql`
  fragment CardTourFragment on STRAPI_TOUR {
    id
    title: name
    link: slug
    peek
    excerpt
    order

    image: hero {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }
  }
`;
