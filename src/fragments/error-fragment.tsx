import { graphql } from "gatsby"

export const query = graphql`
  fragment errorFragment on STRAPI_ERROR {
    title
    description {
      data {
        description
      }
    }
  }
`
