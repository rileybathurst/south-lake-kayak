import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleBookNow } from "@rileybathurst/paddle";

const BookNow = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query BookNowQuery {
      strapiLocale(slug: {eq: "south-tahoe"}) {
        name
        peek_base
      }
    }
  `);

  return (
    <PaddleBookNow
      peek_base={strapiLocale.peek_base}
      strapiLocaleName={strapiLocale.name}
    />
  )
}

export default BookNow
