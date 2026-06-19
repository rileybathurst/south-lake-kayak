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
import { GatsbyImage } from "gatsby-plugin-image";

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

    allStrapiRentalRate(
      filter: {
        favorite: {eq: true},
        branches: {elemMatch: {slug: {eq: "south-tahoe"}}}
        excerpt: {ne: null}
        },
      sort: {order: ASC}
    ) {
      nodes {
        id
        item
        excerpt
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }


  }


`;

const RentalsPage = ({ data }: PaddleRentalsPageTypes) => {

  console.log(data)

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

        {/* // TODO: the button hover color is sand the resting color is blue this needs love */}
        <BookNow />

        <hr />
        <h3 className="font-serif">{data.strapiMembership.title}</h3>
        <p>{data.strapiMembership.excerpt}</p>

        <BookNow
          specificName="Membership"
          specificLink={data.strapiBranch.peek_membership}
        />


        {data.allStrapiRentalRate.nodes.length > 0 && (
          <React.Fragment>
            <hr />

            {data.allStrapiRentalRate.nodes.map(rate => (
              <div key={rate.id}>
                <GatsbyImage
                  image={rate.hero.localFile.childImageSharp.gatsbyImageData}
                  alt={rate.hero.alternativeText}
                  className="poster"
                />
                <h3>* {rate.item}</h3>
                <p>{rate.excerpt}</p>
                <hr />
              </div>
            ))}
          </React.Fragment>
        )}

      </main >

      <section className="condor">
        <h3>
          <Link to="/about/policies">
            Store Policies
          </Link>
        </h3>
      </section>
      <Footer topHR />
    </React.Fragment >
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