import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import WaterTexture from "../images/watertexture";
import { PaddleLocationDeck, PaddleTestimonial, PaddleTicket, type PaddleTicketTypes } from "@rileybathurst/paddle";

// ? 1.0.3 should find this?
// import { PaddleBrandList } from "@rileybathurst/paddle";
// import PaddleBrandList from "@rileybathurst/paddle/src/PaddleBrandList";

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

      strapiTestimonial(local: {slug: {eq: "south-lake"}}) {
          id
          testimonial
          customer
          sign
          location
      }

      allStrapiBrand {
        nodes {
          id
          name
          slug
          svg
          retail {
            title
            slug
            sport {
              slug
            }
          }
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
              <div className="react-markdown">
                <Markdown>{data.southLake.about.data.about}</Markdown>
              </div>            </div>

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

            <PricingChart book={true} />
          </section>
        </div>

      </main>

      <section id="tours" className="pelican water">
        <h3><Link to="/tours">Tours</Link></h3>

        <div className="react-markdown">
          <Markdown>{data.strapiExperience.text.data.text}</Markdown>
        </div>
        <h4>
          <Link to="/tours/compare">Compare Tours</Link>
        </h4>
      </section>

      <div className="deck">
        {data.allStrapiTour.nodes.map((tour: PaddleTicketTypes) => (
          <PaddleTicket
            key={tour.id}
            peek={data.southLake.peek_tours}
            strapiLocaleName={data.southLake.name}
            {...tour}
          />
        ))}
      </div>

      {/* <section id="retail" className="pelican water">
        <article>
            <h3>
              <a
                href={data.tahoeCity.url}
                target="_blank"
                rel='noopener noreferrer'
              >
                Retail Store
              </a>
            </h3>
          </hgroup>

          <div className="react-markdown">
            <Markdown>{data.strapiShop.text.data.text}</Markdown>
          </div>
        </article> */}

      {/* // TODO: v1.2 finish implementing */}
      {/* <PaddleBrandList
          // * no sport throws empty results so for now we just use kayak
          sport='kayak'
          {...data.allStrapiBrand}
        />
        <hr className='aconcagua-margin-block-start aconcagua-margin-block-end' />
      </section> */}









      {/* specifically using a single here */}
      <ul className='pelican aconcagua-margin-block-end'>
        <PaddleTestimonial {...data.strapiTestimonial} />
      </ul>

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
