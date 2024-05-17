import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";
import Ticket from "../components/ticket";
import type { CardType } from "../types/card";
import LocationDeck from "../components/location-deck";
import Sport from "../components/sport";

const ToursPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: { eq: "kayak" },
          locale: {slug: {eq: "south-lake"}},
        },
        sort: {featured: ASC})
      {
        nodes {
          ...tourCard
        }
      }
  
      sup: allStrapiTour(
        filter: {
          sport: { eq: "sup" },
          locale: {slug: {eq: "south-lake"}}
        },
        sort: {featured: ASC}
        )
      {
        nodes {
          ...tourCard
        }
      }

      strapiExperience: strapiExperience {
        text {
          data {
            text
          }
        }
      }

      allStrapiLocation: allStrapiLocation(
          filter: {
            name: {in: ["On Water Rental", "Parking"]}
            locale: {slug: {eq: "south-lake"}}
          }
        ) {
          nodes {
            ...locationCard
          }
        }
    }
  `)

  let sports = [
    query.kayak,
    query.sup,
  ]

  return (
    <>
      <Header />

      <main className="condor">
        <h1>Tours</h1>
        <Markdown
          children={query.strapiExperience.text.data.text}
          className="react-markdown"
        />
        <h2><Link to="/tours/compare">Compare Tours</Link></h2>
        <BookNow />
        <hr />
      </main>
      <section className="pelican">
        <LocationDeck
          locations={query.allStrapiLocation}
          background={false}
        />
      </section>

      {sports.map((sport: any) => (
        <section key={sport.nodes[0].id}>
          <hgroup className="pelican">
            <h1 className="capitalize">
              <Sport sport={sport.nodes[0].sport} />
            </h1>
            <p className="aconcagua">Tours &amp; Lessions</p>
          </hgroup>

          <div className="deck">
            {sport.nodes.map((tour: CardType) => (
              <div key={tour.id}>
                <Ticket tour={tour} />
              </div>
            ))}
          </div>
        </section>
      ))}

      < Footer />
    </>
  )
}

export default ToursPage

export const Head = () => {
  return (
    <SEO
      title={`Tours | ${useSiteMetadata().title}`}
      description="We have many different Kayak and Paddle board Tours to offer. Our tours leave from multiple locations around the lake."
    />
  )
}
