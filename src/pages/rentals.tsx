import * as React from "react"
import { Link, graphql, useStaticQuery, Script } from 'gatsby';

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
        peek_rentals
        name
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="albatross water">
        <article>
          <h1>Rentals</h1>

          <Markdown
            children={data.strapiRental.text.data.text}
            className="react-markdown"
          />
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

          <hr />

          <a
            href={data.strapiLocale.peek_rentals}
            rel="noopener noreferrer"
            className="book-now"
            // title={`Book rentals now with ${data.strapiLocale.name} kayak and paddleboard`}
            type="button"
          >
            BOOK RENTALS NOW
          </a>


          {/*           <button
            popovertarget="my-popover"
          >
            Open Popover
          </button>

          <div id="my-popover" popover='true'>
            test
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              // src={data.strapiLocale.peek_rentals}
              // src='https://book.peek.com/s/e5c64ba3-ccc2-4873-9470-eff6624f74b7/l7ZBO'
              src='https://peekpro.com'
            >
            </iframe>

            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
            </iframe>

          </div> */}


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