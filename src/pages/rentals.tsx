import * as React from "react"
import { graphql, Link } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";

import BookNow from "../components/book-now";
import Hero from "../components/hero";

import { PaddlePricingChart, type PaddleRentalRateType, type PaddleGatsbyImageType } from "@rileybathurst/paddle";
import { GatsbyImage } from "gatsby-plugin-image";

type RentalsPageTypes = {
  data: {
    favorites: {
      nodes: PaddleRentalRateType[]
    },
    fullDayOnly: {
      nodes: PaddleRentalRateType[]
    },
    describedRental: {
      nodes: {
        id: string,
        item: string,
        excerpt: string,
        hero: PaddleGatsbyImageType
      }[]
    },
    strapiBranch: {
      rental_excerpt: string,
      rental: {
        data: {
          rental: string
        }
      },
      peek_membership: string,
      peek_six_pack: string
    },
    strapiMembership: {
      title: string,
      excerpt: string,
      six: string
    },
    strapiLocation: {
      hero: PaddleGatsbyImageType
    }
  }
}

const RentalsPage = ({ data }: RentalsPageTypes) => {

  const allOneHourAreNull = data.favorites.nodes.every((rate) => rate.oneHour === null);
  const allThreeHourAreNull = data.favorites.nodes.every((rate) => rate.threeHour === null);
  const allFullDayAreNull = data.favorites.nodes.every((rate) => rate.fullDay === null);

  // * this is where I decide number of rows
  let numberOfRows = 1
  if (!allOneHourAreNull) ++numberOfRows;
  if (!allThreeHourAreNull) ++numberOfRows;
  if (!allFullDayAreNull) ++numberOfRows;

  console.log(data.favorites.nodes)

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiLocation.hero}
        overlay={<PaddlePricingChart
          rentalRates={data.favorites}
        />}
      />

      <div className="albatross">
        <PaddlePricingChart
          rentalRates={data.fullDayOnly}
        />
      </div>

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

        {/* // * hobie eclipse has a photo etc */}
        {data.describedRental.nodes.length > 0 && (
          <React.Fragment>
            <hr />

            {data.describedRental.nodes.map(rate => (
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

export const Head = ({ data }: RentalsPageTypes) => {

  return (
    <SEO
      title='Rentals'
      description={data.strapiBranch.rental_excerpt}
    />
  )
}

export const data = graphql`
  query {
    favorites: allStrapiRentalRate(
      sort: {order: ASC},
      filter: {
        favorite: {eq: true},
        branches: {elemMatch: {slug: {eq: "south-tahoe"}}},
      }) {
      nodes {
          ...PricingChartFragment
      }
    }

    fullDayOnly: allStrapiRentalRate(
      sort: {order: ASC},
      filter: {
        oneHour: {eq: null}, threeHour: {eq: null},
        branches: {elemMatch: {slug: {eq: "south-tahoe"}}},
      }) {
      nodes {
          ...PricingChartFragment
      }
    }

    describedRental: allStrapiRentalRate(
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

    strapiBranch(slug: {eq: "south-tahoe"}) {
      rental_excerpt
      rental {
        data {
          rental
        }
      }
      peek_membership
      peek_six_pack
    }

    strapiMembership {
      title
      excerpt
      six
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

  }
`;