import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleBookNow } from "@rileybathurst/paddle";

type BookNowTypes = {
  specificLink?: string
}
const BookNow = ({ specificLink }: BookNowTypes) => {

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
      specificLink={specificLink}
    />
  )
}

export default BookNow
