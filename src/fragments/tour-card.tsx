import { graphql } from "gatsby"

export const query = graphql`
  fragment tourCard on STRAPI_TOUR {
    id
    name
    slug
    price
    peek
    excerpt
    start
    finish
    duration
    fitness
    sport

    ogimage {
      localFile {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1.5)
        }
      }
      alternativeText
    }
  }
`

/* (
  breakpoints: [111, 165, 222, 444, 880]
  width: 222
) */
