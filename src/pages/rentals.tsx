import * as React from "react"
import { Link, graphql, useStaticQuery } from 'gatsby';

import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";
import KayakIcon from "../images/kayak";
import CarIcon from "../images/car";
import BookNow from "../components/peek/book-now";
import Composition from "../components/composition";
import LocationDeck from "../components/location-deck";

const RentalsPage = () => {

  const data = useStaticQuery(graphql`
    query RentalRateQuery {
      allStrapiRentalRate(sort: {order: ASC}) {
        nodes {
          id
          oneHour
          item
          threeHour
          fullDay
        }
      }

      allStrapiRentalAddon {
        nodes {
          name
          single
          double
          sup
        }
      }

      allStrapiLocation(
        filter: {
          name: {in: ["On Water Rental", "Parking"]}
          locale: {slug: {eq: "south-lake"}}
        }
      ) {
        nodes {
          ...locationCard
        }
      }

      strapiRental {
        text {
          data {
            text
          }
        }
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="rentals">
        <article className="info">
          <h1>Rentals</h1>

          <LocationDeck
            locations={data.allStrapiLocation}
            background={false}
          />

          <Markdown
            children={data.strapiRental.text.data.text}
            className="react-markdown"
          />

          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

          <BookNow />

        </article>

        <Composition />

      </main >

      <Footer />
    </>
  )
}

export default RentalsPage

export const Head = () => {
  return (
    <SEO
      title={`Rentals | ${useSiteMetadata().title}`}
      description="Enjoy the majesty of paddling across the crystal clear waters of Lake Tahoe while kayaking in one of our demos."
    />
  )
}