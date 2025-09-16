import { graphql } from "gatsby"

export const query = graphql`
  fragment locationCardFragment on STRAPI_LOCATION {
    id
    name
    link
    svg
    opening_time
    closing_time

    streetAddress
    addressLocality
    addressRegion
    postalCode
    commonName

    description {
      data {
        description
      }
    }
    
    branch {
      season_start(formatString: "MMMM DD, YYYY")
      season_end(formatString: "MMMM DD, YYYY")
    }

  }
`
