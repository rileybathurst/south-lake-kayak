// ? should this have a sport always displayed?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Time from "./time"
import type { TicketTypes } from "../types/ticket-types"

const Ticket = ({ tour }: TicketTypes) => {
  return (
    <section className="ticket">
      <Link to={`/tours/${tour.slug}`}>
        <GatsbyImage
          image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
          alt={`${tour?.ogimage?.alternativeText || tour.name} image`}
          objectFit="cover"
          className="card__image"
        />
      </Link>
      <h4 className="card__title">
        <Link to={`/tours/${tour.slug}`}>
          {tour.name}
        </Link>
      </h4>
      <div className="card__specs">

        {/* TODO: hardcoded as this doesnt fit */}
        <Time
          start={tour.start}
          finish={tour.finish}
          duration={tour.duration}
          name={tour.name}
        />
        {tour.fitness ? <h4 className="capitalize">{tour.fitness} <span>Fitness</span></h4> : null}
      </div>
      <hr />
      <p>{tour.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5>${tour.price}</h5>
        <a
          href={tour.peek}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>

    </section>
  )
}

export default Ticket
