import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const BookNow = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query BookNowQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        name
        peek_base
      }
    }
  `);

  return (
    <a
      href={strapiLocale.peek_base}
      rel="noopener noreferrer"
      className="book-now"
      title={`Book now with ${strapiLocale.name} kayak and paddleboard`}
    >
      BOOK NOW
    </a>
  )
}

export default BookNow
