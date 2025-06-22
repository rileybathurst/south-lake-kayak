import * as React from "react"
import { Link } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";
import Composition from "../components/composition";

import { useStrapiRental } from "../hooks/use-strapi-rental";
import BookNow from "../components/peek/book-now";

const RentalsPage = () => {

  // TODO: is this content needed?
  /*   const data = useStaticQuery(graphql`
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
            local: {slug: {eq: "south-lake"}}
          }
        ) {
          nodes {
            ...locationCardFragment
          }
        }
  
        strapiLocale(slug: {eq: "south-lake"}) {
          name
          peek_rentals
        }
      }
    `) */

  return (
    <>
      <Header />
      <main className="albatross wrap">
        <article>
          <div className="pelican">
            <h1>Rentals</h1>

            <div className="react-markdown">
              {/* // TODO: this is now tahoe city text */}
              <Markdown>{useStrapiRental().text.data.text}</Markdown>
            </div>
            <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

            <br /><br />

            <BookNow />
          </div>
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
      description={useStrapiRental().excerpt}
      url="/rentals"
    />
  )
}