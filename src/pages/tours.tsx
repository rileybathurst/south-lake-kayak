import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleFeaturedSort, PaddleCard } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Sport from "../components/sport";
import Hero from "../components/hero";
import BookNow from "../components/book-now";
import Locales from "../components/locales";
import type { TourCardTypes } from "../types/tour-card-types";

const ToursPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: { eq: "kayak" },
          branch: {slug: {eq: "south-tahoe"}},
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...CardTourFragment
          sport
        }
      }
  
      paddleboard: allStrapiTour(
        filter: {
          sport: { eq: "sup" },
          branch: {slug: {eq: "south-tahoe"}}
        },
        sort: {order: ASC}
        )
      {
        nodes {
          ...CardTourFragment
          sport
        }
      }

      strapiExperience {
        text {
          data {
            text
          }
        }
      }

      strapiBranch(slug: {eq: "south-tahoe"}) {
        ...BookNowFragment
      }
    }
  `)

  const sports = [
    query.kayak.nodes,
    query.paddleboard.nodes,
  ]

  console.log(sports)

  return (
    <React.Fragment>
      <Header />

      <Hero
        overlay={<Locales
          water={true}
          parking={true}
        />}
      />

      <main>
        <h1>Tours</h1>
        <div className="react-markdown">
          <Markdown>
            {query.strapiExperience.text.data.text}
          </Markdown>
        </div>
        <h2>
          <Link to="/tours/compare">Compare Tours</Link>
        </h2>

        <BookNow />

        <hr />
      </main>

      {sports.map((sport) => (
        <section key={sport[0].id}>
          <hgroup className="condor">
            <h2 className="capitalize">
              <Sport sport={sport[0].sport} />
            </h2>
            <p className="aconcagua font-serif">Tours &amp; Lessions</p>
          </hgroup>

          <div className="deck">
            {sport.map((tour: TourCardTypes) => (
              <PaddleCard
                key={tour.id}
                {...tour}
                link={`/tours/${tour.link}`}
                paddleBookNow={{
                  peek_base: query.strapiBranch.peek_base,
                  strapiBranchName: query.strapiBranch.name,
                  specificLink: tour.peek,
                }}
              />
            ))}
          </div>
        </section>
      ))}

      <Footer topHR />
    </React.Fragment>
  )
}

export default ToursPage

export const Head = () => {
  return (
    <SEO
      title='Tours'
      // TODO: strapi description
      description="We have many different Kayak and Paddle board Tours to offer. From beginner to advanced, we have a tour for you. Book your tour today!"
    />
  )
}
