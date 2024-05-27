import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import WaterTexture from "../images/watertexture";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import BookNow from "../components/peek/book-now";
import Ticket from "../components/ticket";
import LocationDeck from "../components/location-deck";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {

      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "south-lake"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCard
        }
      }

      allStrapiTour(
        sort: {featured: ASC},
        filter: {locale: {slug: {eq: "south-lake"}}}
        ) {
        nodes {
          ...tourCard
          id
        }
      }

      strapiShop {
        text {
          data {
            text
          }
        }
      }

      strapiExperience {
        text {
          data {
            text
          }
        }
      }

      southLake: strapiLocale(slug: {eq: "south-lake"}) {
        name
        peek_rentals
        peek_tours
        about {
          data {
            about
          }
        }
      }

      tahoeCity: strapiLocale(slug: {eq: "tahoe-city"}) {
        url
      }

      southlakefriends: strapiImagegrab(title: {eq: "south-lake-friends"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      goldshed: strapiImagegrab(title: {eq: "gold-shed"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

    }
  `)

  return (
    <>
      <Header />
      <main className="home">
        <section>
          {/* <h2 className="page-title">
            {faker.company.catchPhrase()}
          </h2> */}
          <div className="margin-block-end-aconcagua">
            <Markdown className="react-markdown">
              {data.southLake.about.data.about}
            </Markdown>
          </div>

          <LocationDeck
            locations={data.allStrapiLocation}
            background={false}
          />

          <div className="button__double">
            <a
              href={data.southLake.peek_rentals}
              target="_blank"
              rel="noopener noreferrer"
              className="book-now"
              title={`book rental kayaks and paddleboards with ${data.southLake.name}`}
            >
              RENTALS<br />
              BOOK NOW
            </a>

            <a
              href={data.southLake.peek_tours}
              target="_blank"
              rel="noopener noreferrer"
              className="book-now"
              title={`book rental kayaks and paddleboards with ${data.southLake.name}`}
            >
              TOURS<br />
              BOOK NOW
            </a>
          </div>

        </section>

        <div>
          <div className="home__photo-grid">
            <GatsbyImage
              image={data.southlakefriends.image.localFile.childImageSharp.gatsbyImageData}
              alt={data.southlakefriends.title}
              className='img__wrapped hero'
            />
            <WaterTexture className="texture" />
            <GatsbyImage
              image={data.goldshed.image.localFile.childImageSharp.gatsbyImageData}
              alt={data.southlakefriends.title}
              className='img__wrapped inset'
            />
          </div>

          <PricingChart book={true} />
        </div>
      </main>

      <section id="tours" className="pelican water">
        <div>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow"><Link to="/tours">Tours</Link></h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>

          <Markdown className="react-markdown">
            {data.strapiExperience.text.data.text}
          </Markdown>

          <h4>
            <Link to="/tours/compare">Compare Tours</Link>
          </h4>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {data.allStrapiTour.nodes.map((tour) => (
          <div key={tour.id}>
            <Ticket tour={tour} />
          </div>
        ))}
      </div>

      <section id="retail" className="pelican water">
        <article>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow">
              <a href={data.tahoeCity.url}
                target="_blank"
                rel='noopener noreferrer'
              >
                Retail Store
              </a>
            </h3>
            <h4 className="supra">Kayaks and Paddleboards</h4>
          </hgroup>

          <Markdown
            children={data.strapiShop.text.data.text}
            className="react-markdown"
          />
        </article>
        <div>
          {/* stay gold */}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO
      title="Home"
    />
  )
}
