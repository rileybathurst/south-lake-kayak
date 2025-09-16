import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck, PaddleFeaturedSort, PaddleTicketTypes, PaddleTicket } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
// import Ticket from "../components/ticket";
import Sport from "../components/sport";

const ToursPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: { eq: "kayak" },
          branch: {slug: {eq: "south-tahoe"}},
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
          branch: {slug: {eq: "south-tahoe"}}
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
          branch: {slug: {eq: "south-tahoe"}}
        }
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      strapiBranch(slug: {eq: "south-tahoe"}) {
        peek_tours
        name
        season_start
        season_end
      }

      

    }
  `)

  /* // TODO: is this the same in south lake?
  allStrapiSunsetTourTime {
          nodes {
        startDate
        endDate
        startTime
        endTime
      }
    } */

  // TODO: rename sup
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

          {/* // ! Book now component */}
          <a
            href={query.strapiBranch.peek_tours}
            rel="noopener noreferrer"
            className="book-now"
            title={`Book tours now with ${query.strapiBranch.name} kayak and paddleboard`}
          >
            BOOK TOURS NOW
          </a>

          <hr />
        </main>

        <section className="pelican">
          <PaddleLocationDeck
            background={false}
            season_start={query.strapiBranch.season_start}
            season_end={query.strapiBranch.season_end}
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

          {/* // ! this is now wrong it should go through a component here and other places */}
          <div className="flight">
            {sport.map((tour: PaddleTicketTypes) => (
              <PaddleTicket
                key={tour.id}
                {...tour}
                peek={query.strapiBranch.peek_tours}
                strapiBranchName={query.strapiBranch.name}
                tour_page="tours"
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

// TODO: strapi description
export const Head = () => {
  return (
    <SEO
      title='Tours'
      description="We have many different Kayak and Paddle board Tours to offer. From beginner to advanced, we have a tour for you. Book your tour today!"
    />
  )
}
