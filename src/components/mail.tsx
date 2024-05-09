import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Mail = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query PhoneQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        email
      }
    }
  `)


  return (
    <a
      href={`mailto:${strapiLocale.email}`}
      rel="norel norefferer"
      className="button"
    >
      {strapiLocale.email}
    </a>
  )
}

export default Mail
