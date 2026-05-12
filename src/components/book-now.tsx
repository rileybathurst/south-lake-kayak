import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleBookNow } from "@rileybathurst/paddle";

type BookNowSpecificTypes = {
  specificName?: string;
  specificLink?: string;
}
const BookNow = ({ specificName, specificLink }: BookNowSpecificTypes) => {

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
      specificName={specificName}
      specificLink={specificLink}
    />
  )
}

export default BookNow
