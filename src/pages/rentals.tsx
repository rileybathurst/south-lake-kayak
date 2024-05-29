import * as React from "react"
import { Link, graphql, useStaticQuery, Script } from 'gatsby';

import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";
import Composition from "../components/composition";

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

      strapiLocale(slug: {eq: "south-lake"}) {
        name
        peek_rentals
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="albatross water">
        <article>
          <h1>Rentals</h1>

          <Markdown className="react-markdown">
            {data.strapiRental.text.data.text}
          </Markdown>
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

          <hr />

          <a
            href={data.strapiLocale.peek_rentals}
            rel="noopener noreferrer"
            className="book-now"
            title={`Book rentals now with ${data.strapiLocale.name} kayak and paddleboard`}
            type="button"
          >
            BOOK RENTALS NOW
          </a>
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
      title='Rentals'
      description="Enjoy the majesty of paddling across the crystal clear waters of Lake Tahoe while kayaking in one of our demos."
      url="/rentals"
    />
  )
}