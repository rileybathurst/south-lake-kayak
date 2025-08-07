import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck, PaddleFeaturedSort, PaddleTicketTypes, PaddleTicket } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Ticket from "../components/ticket";
import Sport from "../components/sport";

const ToursPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: { eq: "kayak" },
          local: {slug: {eq: "south-lake"}},
        },
        sort: {featured: ASC})
      {
        nodes {
          ...ticketFragment
        }
      }
  
      sup: allStrapiTour(
        filter: {
          sport: { eq: "sup" },
          local: {slug: {eq: "south-lake"}}
        },
        sort: {featured: ASC}
        )
      {
        nodes {
          ...ticketFragment
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
          local: {slug: {eq: "south-lake"}}
        }
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      strapiLocale(slug: {eq: "south-lake"}) {
        peek_tours
        name
        season_start
        season_end
      }
    }
  `)

  const sortedKayakTourNodes = query.kayak.nodes;
  PaddleFeaturedSort(sortedKayakTourNodes);

  const sortedSupTourNodes = query.sup.nodes;
  PaddleFeaturedSort(sortedSupTourNodes);

  const sports = [
    sortedKayakTourNodes,
    sortedSupTourNodes,
  ]

  return (
    <>
      <Header />

      <div className="pelican wrap">
        <main className="condor">
          <h1>Tours</h1>
          <div className="react-markdown">
            <Markdown>
              {query.strapiExperience.text.data.text}
            </Markdown>
          </div>
          <h2>
            <Link to="/tours/compare">Compare Tours</Link>
          </h2>

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
          <PaddleLocationDeck
            background={false}
            season_start={query.strapiLocale.season_start}
            season_end={query.strapiLocale.season_end}
            {...query.allStrapiLocation}
          />
        </section>
      </div>

      {sports.map((sport) => (
        <section key={sport[0].id}>
          <hgroup className="pelican">
            <h2 className="capitalize">
              <Sport sport={sport[0].sport} />
            </h2>
            <p className="aconcagua">Tours &amp; Lessions</p>
          </hgroup>

          <div className="flight">
            {sport.map((tour: PaddleTicketTypes) => (
              <PaddleTicket
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
