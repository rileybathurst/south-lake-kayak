import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck } from "@rileybathurst/paddle";

import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header"
import Footer from "../components/footer"
// import PricingChart from "../components/pricing-chart"
import WaterTexture from "../images/watertexture";
import Ticket from "../components/ticket";
import { PaddleTestimonials } from "@rileybathurst/paddle";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {

      allStrapiLocation(
        filter: {
          local: {slug: {eq: "south-lake"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      allStrapiTour(
        sort: {featured: ASC},
        filter: {local: {slug: {eq: "south-lake"}}}
        ) {
        nodes {
          ...tourCardFragment
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
        season_start
        season_end
        phone
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

      allStrapiTestimonial(filter: {local: {slug: {eq: "south-lake"}}}) {
        nodes {
          id
          testimonial
          customer
          sign
          location
        }
      }

    }
  `)

  return (
    <>
      <Header />
      <main className="albatross wrap home">
        <div>
          <section className="pelican">

            <div className="margin-block-end-aconcagua">
              <Markdown className="react-markdown">
                {data.southLake.about.data.about}
              </Markdown>
            </div>

            <PaddleLocationDeck
              background={false}
              season_start={data.southLake.season_start}
              season_end={data.southLake.season_end}
              phone={data.southLake.phone}

              {...data.allStrapiLocation}
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
        </div>

        <div>
          <section className="pelican">
            <div className="home__photo-grid">
              <GatsbyImage
                image={data.southlakefriends.image.localFile.childImageSharp.gatsbyImageData}
                alt={data.southlakefriends.title}
                className='img__wrapped hero'
              />
              {/* // ? this seems like every time it would have that classname */}
              <WaterTexture className="texture" />
              <GatsbyImage
                image={data.goldshed.image.localFile.childImageSharp.gatsbyImageData}
                alt={data.southlakefriends.title}
                className='img__wrapped inset'
              />
            </div>

            {/* // ! testing <PricingChart book={true} /> */}
          </section>
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
          <Ticket
            key={tour.id}
            {...tour}
          />
        ))}
      </div>

      <section id="retail" className="pelican water">
        <article>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow">
              <a
                href={data.tahoeCity.url}
                target="_blank"
                rel='noopener noreferrer'
              >
                Retail Store
              </a>
            </h3>
            <h4 className="supra">Kayaks and Paddleboards</h4>
          </hgroup>

          <Markdown className="react-markdown">
            {data.strapiShop.text.data.text}
          </Markdown>
        </article>
        <div>
          {/* stay gold */}
        </div>
      </section>

      <section>
        <hr className="pelican" />
        <h2 className="condor">
          <Link to="/about/testimonials">
            Testimonials
          </Link>
        </h2>
        <PaddleTestimonials {...data.allStrapiTestimonial} />
      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO />
  )
}
