import { graphql } from "gatsby"

export const query = graphql`
  fragment locationCardFragment on STRAPI_LOCATION {
    id
    name
    link
    svg
    opening_time
    closing_time

    address {
      data {
        address
      }
    }

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
    
    locale {
      season_start(formatString: "MMMM DD")
      season_end(formatString: "MMMM")
    }

  }
`
