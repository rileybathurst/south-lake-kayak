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

    showThePhone
    weatherPermitting

    description {
      data {
        description
      }
    }

    offSeasonDetails
    
    branch {
      season_start(formatString: "MMMM DD")
      season_end(formatString: "MMMM")
    }

  }
`
