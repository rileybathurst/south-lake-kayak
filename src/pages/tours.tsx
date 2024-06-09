import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Ticket from "../components/ticket";
import LocationDeck from "../components/location-deck";
import Sport from "../components/sport";
import type { TicketTypes } from "../types/ticket-types";

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
          ...tourCardFragment
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
          ...tourCardFragment
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
          ...locationCardFragment
        }
      }

      strapiLocale(slug: {eq: "south-lake"}) {
        peek_tours
        name
      }
    }
  `)

  const sports = [
    query.kayak,
    query.sup,
  ]

  return (
    <>
      <Header />

      <main className="condor">
        <h1>Tours</h1>
        <Markdown
          className="react-markdown"
        >
          {query.strapiExperience.text.data.text}
        </Markdown>
        <h2><Link to="/tours/compare">Compare Tours</Link></h2>

        <a
          href={query.strapiLocale.peek_tours}
          rel="noopener noreferrer"
          className="book-now"
          title={`Book tours now with ${query.strapiLocale.name} kayak and paddleboard`}
        >
          BOOK TOURS NOW
        </a>

        <hr />
      </main>
      <section className="pelican">
        <LocationDeck
          background={false}
          {...query.allStrapiLocation}
        />
      </section>

      {sports.map((sport) => (
        <section key={sport.nodes[0].id}>
          <hgroup className="pelican">
            <h2 className="capitalize">
              <Sport sport={sport.nodes[0].sport} />
            </h2>
            <p className="aconcagua">Tours &amp; Lessions</p>
          </hgroup>

          <div className="deck">
            {sport.nodes.map((tour: TicketTypes) => (
              <Ticket
                key={tour.id}
                {...tour}
              />
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
      title='Tours'
      description="We have many different Kayak and Paddle board Tours to offer. From beginner to advanced, we have a tour for you. Book your tour today!"
    />
  )
}
