import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleBookNow } from "@rileybathurst/paddle";

const BookNow = () => {

  const { strapiBranch } = useStaticQuery(graphql`
    query BookNowQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        peek_base
      }
    }
  `);

  return (
    <PaddleBookNow
      peek_base={strapiBranch.peek_base}
      strapiBranchName={strapiBranch.name}
    />
  )
}

export default BookNow
