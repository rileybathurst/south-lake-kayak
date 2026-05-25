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
        rental {
          data {
            rental
          }
        }
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

      strapiFaq {
        question
        answer
      }

    }
  `)

  return (
    <React.Fragment>
      <Header />

      <Hero
        overlay={<Locales all={true} />}
      />

      <section className="albatross everest-margin-block-end">
        <PricingChart />
      </section>

      <main>

        <div className="react-markdown">
          <Markdown>{data.southLake.about.data.about}</Markdown>
        </div>

        <h3 className="font-serif">Rentals</h3>

        <div className="react-markdown">
          <Markdown>{data.southLake.rental.data.rental}</Markdown>
        </div>


        <div className="multi_button">
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

      <section id="tours" className="condor panel">
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

        <h4 className="pelican">
          <Link to="/about/testimonials">Why Paddlers Keep Coming Back</Link>
        </h4>
      </section>

      <section className="pelican panel denali-padding-block">
        <h3 className="font-serif">{data.strapiFaq.question}</h3>
        <p>{data.strapiFaq.answer}</p>

        <h4>
          <Link to="/about/faq">Paddle through our FAQs</Link>
        </h4>
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
