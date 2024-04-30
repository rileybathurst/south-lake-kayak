// * this is the tour version of a card
// ? should this have a sport always displayed?

import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Time from "./time"
import Fitness from "./fitness"

const Ticket = (tour: {
  tour: {
    id: React.Key;
    ogimage: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; };
    slug: string;
    name: string;
    start: Date;
    finish: Date;
    duration: Date;
    fitness: string;
    excerpt: string;
    price: string;
    peek: string;
  };
}) => {


  return (
    <Link to={`/tours/${tour.tour.slug}`}
      className="card"
    >
      <GatsbyImage
        image={tour.tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
        alt={tour.tour?.ogimage?.alternativeText}
        className="card__image"
      />
      <h4 className="card__title">
        {tour.tour.name}
      </h4>
      <div className="card__specs">
        <Time
          start={tour.tour.start}
          finish={tour.tour.finish}
          duration={tour.tour.duration}
        />
        <Fitness fitness={tour.tour.fitness} />
      </div>
      <hr />
      <p>{tour.tour.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5>${tour.tour.price}</h5>
        <a
          href={tour.tour.peek}
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>
    </Link>
  )
}

export default Ticket
