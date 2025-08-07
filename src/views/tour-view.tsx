import * as React from "react";
import { Link, graphql } from "gatsby";
import { PaddleTime, PaddleTicket, PaddleFeaturedSort, type PaddleTicketTypes, type PaddleLocationCardTypes, type PaddleGatsbyImageType } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer";
import Composition from "../components/composition";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/peek/book-now";
import { PaddleSpecs } from "@rileybathurst/paddle";
import LocationDeck from "../components/location-deck";

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
      timeframe: string;
      minimum: number;
      fitness: string;
      experience: string;
      peek: string;
      sport: string;
      excerpt: string;
      price: number;
      slug: string;
      ogimage: PaddleGatsbyImageType;
      compositionImage: PaddleGatsbyImageType;
    }

    local: {
      name: string;
    }
    allStrapiTour: {
      nodes: PaddleTicketTypes[];
    }

    allStrapiLocation: PaddleLocationCardTypes[];

    strapiLocale: {
      season_start: string;
      season_end: string;
      peek_tours: string;
    }
  }
}


export const data = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      local: {slug: {eq: "south-lake"}}
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
      timeframe
      minimum
      fitness
      experience
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

      compositionImage {
        localFile {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: CONSTRAINED)
          }
        }
        alternativeText
      }

      local {
        name
      }
    }

    allStrapiTour(
        filter: {
          slug: {nin: [$slug] },
          local: {slug: {eq: "south-lake"}}
          },
        sort: {featured: ASC},
      ) {
      nodes {
        ...ticketFragment
      }
    }

    allStrapiLocation(
      filter: {
        local: {slug: {eq: "south-lake"}},
        name: {in: ["On Water Rental", "Free Parking Lot"]}
      },
      sort: {order: ASC}
    ) {
      nodes {
        ...locationCardFragment
      }
    }

    strapiLocale(slug: {eq: "south-lake"}) {
      season_start
      season_end
      peek_tours
    }
  }
`

const TourView = ({ data }: TourViewTypes) => {

  const sortedTourNodes = data.allStrapiTour.nodes;
  PaddleFeaturedSort(sortedTourNodes);

  const time = PaddleTime({
    start: data.strapiTour.start,
    finish: data.strapiTour.finish,
    duration: data.strapiTour.duration,
    timeframe: data.strapiTour.timeframe,
  });

  return (
    <>
      <Header />

      <main className="tour">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            <BookNow />
            {data.strapiTour.minimum ? <p>* Prices based on a<br /> {data.strapiTour.minimum} person minimum</p> : null}
          </div>

          <PaddleSpecs
            sport={data.strapiTour.sport}
            fitness={data.strapiTour.fitness}
            experience={data.strapiTour.experience}
            price={data.strapiTour.price}
            time={time}
          />

          <div className="react-markdown single__description">
            <Markdown>
              {data.strapiTour.information?.data?.information}
            </Markdown>
          </div>

          {/* // ! move MoonlightTourDatesTimes from tahoe city to paddle add a current date and add it here */}

        </div>

        <aside>
          <Composition
            sport={data.strapiTour.sport}
            image={data.strapiTour?.compositionImage}
          />

          <LocationDeck
            allStrapiLocation={data.allStrapiLocation}
          />
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

      <section className="flight">
        {sortedTourNodes.map((tour: PaddleTicketTypes) =>
          <PaddleTicket
            key={tour.id}
            {...tour}
            tour_page="tours"
            peek_tours_fall_back={data.strapiLocale.peek_tours}
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

type TourViewHeadTypes = {
  data: {
    strapiTour: {
      name: string;
      excerpt: string;
    }
  }
}
export const Head = ({ data }: TourViewHeadTypes) => {
  return (
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
      breadcrumbs={[
        { name: 'tours', item: 'tours' },
        { name: data.strapiTour.name, item: `tours/${data.strapiTour.name}` }
      ]}
    />
  );
}
