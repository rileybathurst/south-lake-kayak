import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import { PaddleTestimonial, PaddleCard } from "@rileybathurst/paddle";
import Locales from "../components/locales";
import Hero from "../components/hero";
import { TourCardTypes } from "../types/tour-card-types";
import BookNow from "../components/book-now";

// ? 1.0.3 should find this?
// import { PaddleBrandList } from "@rileybathurst/paddle";
// import PaddleBrandList from "@rileybathurst/paddle/src/PaddleBrandList";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {
      
      allStrapiTour(
        sort: {order: ASC},
        filter: {branch: {slug: {eq: "south-tahoe"}}}
        ) {
        nodes {
          ...CardTourFragment
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

      southLake: strapiBranch(slug: {eq: "south-tahoe"}) {
        ...BookNowFragment
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

      tahoeCity: strapiBranch(slug: {eq: "tahoe-city"}) {
        url
      }

      strapiTestimonial(branch: {slug: {eq: "south-tahoe"}}) {
        ...TestimonialFragment
      }

      allStrapiBrand {
        nodes {
          ...BrandListFragment
        }
      }

    }
  `)

  return (
    <React.Fragment>
      <Header />
      <main className="albatross">

        <Hero
          overlay={<Locales all={true} />}
        />

        <PricingChart />

        <div className="pelican react-markdown">
          <Markdown>{data.southLake.about.data.about}</Markdown>
        </div>


        <div className="pelican multi_button">
          <BookNow
            specificName="rentals"
            specificLink={data.southLake.peek_rentals}
          />

          <BookNow
            specificName="tours"
            specificLink={data.southLake.peek_tours}
          />
        </div>

      </main>

      <section id="tours" className="pelican panel">
        <h3 className="font-serif">
          <Link to="/tours">Tours</Link>
        </h3>

        <div className="react-markdown">
          <Markdown>{data.strapiExperience.text.data.text}</Markdown>
        </div>
        <h4>
          <Link to="/tours/compare">Compare Tours</Link>
        </h4>
      </section>

      <div className="deck panel">
        {data.allStrapiTour.nodes.map((tour: TourCardTypes) => (
          <PaddleCard
            key={tour.id}
            {...tour}
            link={`/tours/${tour.link}`}
            paddleBookNow={{
              peek_base: data.southLake.peek_base,
              strapiBranchName: data.southLake.name,
              specificLink: tour.peek,
            }}
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

          <div className="react-markdown">
            <Markdown>{data.strapiShop.text.data.text}</Markdown>
          </div>
        </article>

        <PaddleBrandList
          // * no sport throws empty results so for now we just use kayak
          sport='kayak'
          {...data.allStrapiBrand}
        />
        <hr className='aconcagua-margin-block-start aconcagua-margin-block-end' />
      </section> */}

      {/* // * specifically using a single here */}
      <section className="denali-padding-block">
        <ul className='pelican aconcagua-margin-block-end'>
          <PaddleTestimonial {...data.strapiTestimonial} />
        </ul>
      </section>

      <Footer topHR />
    </React.Fragment >
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO />
  )
}
