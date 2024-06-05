import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Time from "../components/time";
import LocationCard from "../components/location-card";
import Composition from "../components/composition";
import Ticket from "../components/ticket";
import type { TicketTypes } from "../types/ticket-types";
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { CardType } from "../types/card";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/peek/book-now";

// ? Can I use the time component here?
interface TimingTypes {
  start?: string;
  finish?: string;
  duration?: number;
  name?: string;
}
function Timing({ start, finish, duration, name }: TimingTypes) {
  // TODO: remove hardcoding
  if (name === "Illuminated Full Moon Tour") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <h4>Sunset</h4>
      </section>
    )
  }

  // TODO: remove hardcoding
  if (name === "Emerald Bay Boat Camp Overnight") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <h4>Overnight</h4>
      </section>
    )
  }

  // TODO: remove hardcoding
  if (start && finish !== "Emerald Bay Boat Camp Overnight" && name !== "Illuminated Full Moon Tour") {
    return (
      <section className="spec attribute">
        <h3 className="crest">Time</h3>
        <Time start={start} finish={finish} />
      </section>
    )
  }

  if (duration) {
    if (duration > 90) {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;

      return (
        <section className="spec attribute">
          <h3 className="crest">Duration</h3>
          <h4>{hours} hrs {mins > 0 ? `${mins}mins` : null}</h4>
        </section>
      )
    }

    return (
      <section className="spec attribute">
        <h3 className="crest">Duration</h3>
        <h4 className="range">
          {duration} mins
        </h4>
      </section>
    )
  }
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
  data: {
    strapiTour: {
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
    allStrapiTour: {
      nodes: TicketTypes;
    }

    strapiLocation: CardType;
  }
}

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      locale: {slug: {eq: "south-lake"}}
      ) {
      id
      name
      information {
        data {
          information
        }
      }
      start
      finish
      duration
      minimum
      fitness
      peek
      sport
      excerpt
      price
      slug

      ogimage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }

      locale {
        name
      }
    }

    allStrapiTour(
        filter: {
          slug: {nin: [$slug] },
          locale: {slug: {eq: "south-lake"}}
          },
        sort: {featured: ASC},
      ) {
      nodes {
        ...tourCardFragment
      }
    }

    strapiLocation(
      locale: {slug: {eq: "south-lake"}}
      name: {eq: "On Water Rental"}
    ) {
      ...locationCardFragment

      locale {
        name
      }
    }
  }
`

const TourView = ({ data }: TourViewTypes) => {
  return (
    <>
      <Header />

      <main className="tour">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            {data.strapiTour.peek ?
              <a href={data.strapiTour.peek}
                rel="noopener noreferrer"
                className="book-now"
              >
                BOOK NOW
              </a>
              :
              <BookNow />
            }
            <Minimum minimum={data.strapiTour.minimum} />
          </div>

          <Attributes
            sport={data.strapiTour.sport}
            fitness={data.strapiTour.fitness}
            price={data.strapiTour.price}
          />

          {data.strapiTour.name === "Emerald Bay Boat Camp Overnight" ?
            <section className="spec attribute">
              <h3 className="crest">Time</h3>
              <h4>Overnight</h4>
            </section>
            :
            <Timing
              start={data.strapiTour.start}
              finish={data.strapiTour.finish}
              duration={data.strapiTour.duration}
              name={data.strapiTour.name}
            />
          }

          <Markdown className="react-markdown single__description">
            {data.strapiTour.information?.data?.information}
          </Markdown>

        </div>

        <aside>
          <Composition
            sport={data.strapiTour.sport}
          // TODO: change the image on tours
          />

          <LocationCard {...data.strapiLocation} />
        </aside>

      </main>

      <hr className="albatross" />

      <div className="albatross">
        <h3>Other Tours</h3>
        <h4>
          <Link to={`/tours/compare/?${data.strapiTour.slug}`}>
            Compare the {data.strapiTour.name} to another tour.
          </Link>
        </h4>
        <hr />
      </div>

      <section className="deck">
        {data.allStrapiTour.nodes.map((tour: TicketTypes) =>
          <Ticket
            key={tour.id}
            {...tour}
          />
        )}
      </section>

      <Breadcrumbs>
        <Breadcrumb><Link to="/tours">Tours</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTour.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default TourView;

// ! SEO breadcrumbs is now removed