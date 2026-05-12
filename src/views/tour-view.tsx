import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleCard,
  PaddleMoonlightDatesTimes,
  type PaddleLocationTypes,
  type PaddleGatsbyImageType,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/book-now";
import { PaddleSpecs } from "@rileybathurst/paddle";
import Locales from "../components/locales";
import Hero from "../components/hero";
import { TourCardTypes } from "../types/tour-card-types";

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

    branch: {
      name: string;
    }

    allStrapiMoonlightTourDateTime: {
      nodes: {
        id: React.Key;
        date: string;
        start: string;
        finish: string;
      }[];
    }

    allStrapiTour: {
      nodes: TourCardTypes[];
    }

    allStrapiLocation: {
      nodes: PaddleLocationTypes[];
    };

    strapiBranch: {
      name: string;
      peek_base: string;
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
      branch: {slug: {eq: "south-tahoe"}}
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

      branch {
        name
      }
    }

    allStrapiMoonlightTourDateTime(sort: {date: ASC}) {
      nodes {
        id
        date
        start
        finish
      }
    }

    allStrapiTour(
        filter: {
          slug: {nin: [$slug] },
          branch: {slug: {eq: "south-tahoe"}}
          },
        sort: {order: ASC},
      ) {
      nodes {
        ...CardTourFragment
      }
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      ...BookNowFragment
      season_start
      season_end
      peek_tours
    }
  }
`

const TourView = ({ data }: TourViewTypes) => {

  return (
    <>
      <Header />

      <Hero
        image={data.strapiTour.ogimage}
        overlay={<Locales
          water={true}
          parking={true}
        />}
      />
      {/*       <Composition
          sport={data.strapiTour.sport}
          image={data.strapiTour?.compositionImage}
        /> */}

      <main className="tour">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            <BookNow />
            {data.strapiTour.minimum ? <p>* Prices based on a<br /> {data.strapiTour.minimum} person minimum</p> : null}
          </div>

          {/* // TODO: time is still a work in progress */}
          <PaddleSpecs
            sport={data.strapiTour.sport}
            fitness={data.strapiTour.fitness}
            experience={data.strapiTour.experience}
            price={data.strapiTour.price}
          // time={time}
          />

          <div className="react-markdown">
            <Markdown>
              {data.strapiTour.information?.data?.information}
            </Markdown>
          </div>

          {data.strapiTour.slug === "full-moon" ? (
            <PaddleMoonlightDatesTimes
              nodes={data.allStrapiMoonlightTourDateTime.nodes}
            />
          ) : null}

        </div>
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
        {data.allStrapiTour.nodes.map((tour: TourCardTypes) =>
          <PaddleCard
            key={tour.id}
            {...tour}
            link={`/tours/${tour.link}`}
            paddleBookNow={{
              peek_base: data.strapiBranch.peek_base,
              strapiBranchName: data.strapiBranch.name,
              specificLink: tour.peek,
            }}
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
