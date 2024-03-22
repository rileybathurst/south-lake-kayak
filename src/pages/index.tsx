import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
// import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import Complete from '../components/locations/complete';
import AboutUs from "../content/about-us";
import Shop from "../content/shop";
import Card from "../components/card";
import Experience from "../content/experience";
import Ticket from "../components/ticket";

const IndexPage = () => {

  return (
    <>
      <Header />
      <main className="home">
        <section>
          <h2 className="page-title">
            North Lake Tahoe&apos;s Premier Kayak and Paddleboard Provider, offering Rentals, Sales, Lessons and Tours
          </h2>

          <AboutUs />

          <Complete />

          <div className="button__double">
            <BookRental />
            <BookTour />
          </div>

        </section>

        <div>
          <div className="home__photo-grid">
            <TwoKayakers className="kayakers" />
            <WaterTexture className="texture" />
            <AndyPaddling className="andy" />
          </div>

          <hr />

          <PricingChart book="no" />
        </div>
      </main>

      <section id="tours-lessons" className="home__tours">
        <div>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow"><Link to="/tours-lessons">Tours &amp; Lessons</Link></h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>
          <Experience />
          <h4>
            <Link to="/tours-lessons/compare">Compare Tours &amp; Lessons</Link>
          </h4>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {/* {list.map((tour) => (
          <div key={tour.id}>
            <Ticket tour={tour} />
          </div>
        ))} */}
      </div>
      <div className="deck__more">
        <hr />
      </div>

      {/* // TODO add this back inthis probably still needs more */}
      {/* <MapSVG /> */}

      <section id="retail" className="passage">
        {/* <h3><Link to="/retail" className="">Retail</Link></h3> */}
        {/* // TODO: only one h and then p */}
        <hgroup className="crest">
          <h3 className="brow"><Link to="/retail">Retail Store</Link></h3>
          <h4 className="supra">Kayaks and Paddleboards</h4>
        </hgroup>

        <Shop />
        <hr />
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
