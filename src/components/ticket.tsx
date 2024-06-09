// ? should this have a sport always displayed?

import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import type { TicketTypes } from "../types/ticket-types"
import { PaddleTime } from "@rileybathurst/paddle";

const Ticket = ({ ogimage, slug, name, start, finish, duration, timeframe, fitness, excerpt, price, peek }: TicketTypes) => {

  const time = PaddleTime({
    start: start,
    finish: finish,
    duration: duration,
    timeframe: timeframe,
  });

  const { strapiLocale } = useStaticQuery(graphql`
    query {
      strapiLocale(slug: {eq: "south-lake"}) {
        peek_tours
      }
    }
  `);


  return (
    <section className="ticket">
      <Link to={`/tours/${slug}`}>
        <GatsbyImage
          image={ogimage?.localFile?.childImageSharp?.gatsbyImageData}
          // ? are these brackets in the right spot?
          alt={`${ogimage?.alternativeText || name} image`}
          objectFit="cover"
          className="card__image"
        />
      </Link>
      <h4 className="card__title">
        <Link to={`/tours/${slug}`}>
          {name}
        </Link>
      </h4>
      <div className="card__specs">
        <h4>{time.entry}</h4>
        {fitness ? <h4 className="capitalize">{fitness} <span>Fitness</span></h4> : null}
      </div>
      <hr />
      <p>{excerpt}</p>
      <hr />
      <div className="card__details">
        <h5>${price}</h5>
        <a
          href={peek ? peek : strapiLocale.peek_tours}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>

    </section>
  )
}

export default Ticket
