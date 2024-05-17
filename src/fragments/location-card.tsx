import { graphql } from "gatsby"

export const query = graphql`
  fragment locationCard on STRAPI_LOCATION {
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
