import * as React from "react"
import { graphql, Link } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";

import BookNow from "../components/book-now";
import Hero from "../components/hero";

import { type PaddleRentalsPageTypes, PaddlePricingChart } from "@rileybathurst/paddle";
import PricingChart from "../components/pricing-chart";

export const data = graphql`
  query {
    strapiBranch(slug: {eq: "south-tahoe"}) {
      rental_excerpt
      rental {
        data {
          rental
        }
      }
      peek_membership
    }

    strapiLocation(
      name: {eq: "On Water Rental"}
      branch: {slug: {eq: "south-tahoe"}}
    ) {
      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

      strapiMembership {
        title
        excerpt
      }
    }
`;

const RentalsPage = ({ data }: PaddleRentalsPageTypes) => {

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiLocation.hero}
        overlay={
          <PricingChart />}
      />
      <main>
        <h1>Rentals</h1>

        <div className="react-markdown">
          <Markdown>{data.strapiBranch.rental.data.rental}</Markdown>
        </div>

        <p>
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>
        </p>

        {/* // * the book now button wants to get inline with the link */}
        <br />

        <BookNow />

        <hr />
        <h3 className="font-serif">{data.strapiMembership.title}</h3>
        <p>{data.strapiMembership.excerpt}</p>

        <BookNow
          specificName="Membership"
          specificLink={data.strapiBranch.peek_membership}
        />

      </main >

      <section className="condor">
        <hr />
        <h3>
          <Link to="/about/policies">
            Store Policies
          </Link>
        </h3>
      </section>
      <Footer topHR />
    </React.Fragment>
  )
}

export default RentalsPage

export const Head = ({ data }: PaddleRentalsPageTypes) => {

  return (
    <SEO
      title='Rentals'
      description={data.strapiBranch.rental_excerpt}
    />
  )
}