import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleCard,
  PaddleMoonlightDatesTimes,
  PaddleSpecs,
  type PaddleTourViewTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/book-now";
import Locales from "../components/locales";
import Hero from "../components/hero";

export const data = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      branch: {slug: {eq: "south-tahoe"}}
    ) {
      ...CardTourFragment
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
      sport
      price
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

      {/* // TODO: I shouldn't need this */}
      {data.strapiTour.image &&
        <Hero
          image={data.strapiTour.image}
          overlay={<Locales
            water={true}
            parking={true}
          />}
        />
      }

      <main className="tour">
        <div>
          <h1>{data.strapiTour.title}</h1>
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

          {data.strapiTour.link === "full-moon" ? (
            <PaddleMoonlightDatesTimes
              nodes={data.allStrapiMoonlightTourDateTime.nodes}
            />
          ) : null}

        </div>
      </main>

      <hr className="condor" />

      <div className="condor">
        <h3>Other Tours</h3>
        <h4>
          <Link to={`/tours/compare/?${data.strapiTour.link}`}>
            Compare the {data.strapiTour.title} to another tour.
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
        <Breadcrumb>{data.strapiTour.title}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  );
};

export default TourView;

export const Head = ({ data }: PaddleTourViewTypes) => {
  return (
    <SEO
      title={data.strapiTour.title}
      description={data.strapiTour.excerpt}
      // TODO: image 
      breadcrumbs={[
        { name: 'tours', item: 'tours' },
        { name: data.strapiTour.title, item: `tours/${data.strapiTour.link}` }
      ]}
    />
  );
}
