import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Time from "../components/time";
import LocationCard from "../components/location-card";
import Composition from "../components/composition";
import Ticket from "../components/ticket";
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { CardType } from "../types/card";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/peek/book-now";

interface TimingTypes {
  start?: string;
  finish?: string;
  duration?: number;
  name?: string;
}
function Timing({ start, finish, duration, name }: TimingTypes) {

  if (name === "Illuminated Full Moon Tour") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <h4>Sunset</h4>
      </section>
    )
  }

  if (name === "Emerald Bay Boat Camp Overnight") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <h4>Overnight</h4>
      </section>
    )
  }

  if (start && finish !== "Emerald Bay Boat Camp Overnight" && name !== "Illuminated Full Moon Tour") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <Time start={start} finish={finish} />
      </section>
    )
  }

  return (
    <section className="spec attribute">
      <h3 className="crest">Duration</h3>
      <h4 className="range">{duration} mins</h4>
    </section>
  )
}

interface AttributesProps {
  sport?: string | null;
  fitness?: string | null;
  price?: number | null;
  minimum?: number | null;
}
function Attributes(attributes: AttributesProps) {

  const sections = Object.entries(attributes).map(([key, value]) => {
    if (value) {
      if (key === "duration") {
        const unit = "mins";
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            <h4 className="range">{value} {unit}</h4>
          </section >
        )
      }

      if (key === "price") {
        const unit = "$";
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            <h4 className="range">{unit}{value}</h4>
          </section >
        )
      }

      if (key === "start" || key === "finish") {
        // const time = new Date(value);
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            {/* <h4 className="range"><HourMin time={value} /></h4> */}
            <Time start={attributes.start} finish={attributes.finish} />
          </section >
        )
      }

      return (
        <section
          key={key}
          // TODO: I have both names tidy it up
          className="spec attribute"
        >
          <h3 className="crest">{key}</h3>
          <h4 className="range">{value}</h4>
        </section >
      )
    }
  })

  return (
    <div className="attributes">
      {sections}
    </div>
  )
}
interface MinimumTypes {
  minimum: number;
}
function Minimum({ minimum }: MinimumTypes) {
  if (minimum) {
    return (
      <p>* Prices based on a<br />
        {minimum} person minimum</p>
    );
  }

  return null;
}


interface TourViewTypes {
  tour: {
    id: React.Key;
    name: string;
    information: {
      data: {
        information: string;
      }
    };
    start: string;
    finish: string;
    duration: number;
    minimum: number;
    fitness: string;
    peek: string;
    sport: string;
    excerpt: string;
    price: number;
    slug: string;
    ogimage: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      alternativeText: string;
    };
  }
  locale: {
    name: string;
  }
  other: CardType;
}
const TourView = ({ tour, other }: TourViewTypes) => {

  const { strapiLocation } = useStaticQuery(graphql`
  query TourViewQuery {
    strapiLocation(
      locale: {slug: {eq: "south-lake"}}
      name: {eq: "On Water Rental"}
    ) {
      ...locationCard

      locale {
        name
      }
    }
  }
`);

  return (
    <>
      <Header />

      <main className="tour">
        <div>
          <h1>{tour.name}</h1>
          <div className="tour__minimum">
            {tour.peek ?
              <a href={tour.peek}
                rel="noopener noreferrer"
                className="book-now"
              >
                BOOK NOW
              </a>
              :
              <BookNow />
            }
            <Minimum minimum={tour.minimum} />
          </div>

          <Attributes
            sport={tour.sport}
            fitness={tour.fitness}
            price={tour.price}
          />

          {tour.name === "Emerald Bay Boat Camp Overnight" ?
            <section className="spec attribute">
              <h3 className="crest">Time</h3>
              <h4>Overnight</h4>
            </section>
            :
            <Timing
              start={tour.start}
              finish={tour.finish}
              duration={tour.duration}
              name={tour.name}
            />
          }

          <Markdown className="react-markdown single__description">
            {tour.information?.data?.information}
          </Markdown>

        </div>

        <aside>
          <Composition
            sport={tour.sport}
          // hero={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
          // TODO: change the image on tours
          />

          <LocationCard location={strapiLocation} />
        </aside>

      </main>

      <hr className="albatross" />

      <div className="albatross">
        <h3>Other Tours</h3>
        <h4><Link to={`/tours/compare/?${tour.slug}`}>Compare the {tour.name} to another tour.</Link></h4>
        <hr />
      </div>

      {/* // TODO: other card */}
      <section className="deck">
        {other.nodes.map((tour: TicketTypes) =>
          <Ticket
            key={tour.id}
            tour={tour}
          />
        )}
      </section>

      <Breadcrumbs>
        <Breadcrumb><Link to="/tours">Tours</Link></Breadcrumb>
        <Breadcrumb>{tour.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default TourView;
