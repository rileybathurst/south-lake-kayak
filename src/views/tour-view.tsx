import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleCard,
  PaddleMoonlightDatesTimes,
  type PaddleTourViewTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/book-now";
import { PaddleSpecs, type PaddleTourCardTypes } from "@rileybathurst/paddle";
import Locales from "../components/locales";
import Hero from "../components/hero";

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

      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
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

const TourView = ({ data }: PaddleTourViewTypes) => {

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiTour.hero}
        overlay={<Locales
          water={true}
          parking={true}
        />}
      />

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
        {data.allStrapiTour.nodes.map((tour) =>
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
    </React.Fragment>
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
      // TODO: image 
      breadcrumbs={[
        { name: 'tours', item: 'tours' },
        { name: data.strapiTour.name, item: `tours/${data.strapiTour.name}` }
      ]}
    />
  );
}
