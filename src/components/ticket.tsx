import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddleCard, type PaddleTicketTypes } from "@rileybathurst/paddle";

const Ticket = (tour: PaddleTicketTypes) => {

  const { strapiBranch } = useStaticQuery(graphql`
    query TicketQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        peek_tours
      }
    }
  `);

  return (
    <PaddleCard
      key={tour.id}
      {...tour}
      peek={strapiBranch.peek_tours}
      strapiBranchName={strapiBranch.name}
      tour_page="tours"
    />
  )
}

export default Ticket
