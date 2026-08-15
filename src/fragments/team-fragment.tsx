import { graphql } from "gatsby"

export const query = graphql`
  fragment TeamCardFragment on STRAPI_TEAM {
    id
    title: name
    link: slug
    excerpt
    position
    hometown
    branches {
      slug
    }

    image: profile {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }
    imageSlide
  }
`