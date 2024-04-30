import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';

import Header from "../components/header";
import Footer from "../components/footer";
import MapSVG from "../images/map";

const MapPage = () => {

  return (
    <>
      <Header />

      <main className="progression">
        <h1>Map</h1>
      </main>

      {/* // TODO: naming */}
      <div className="home__here">
        {/* <Complete /> */}
        <MapSVG />
      </div>

      <Footer />
    </>
  )
}

export default MapPage

export const Head = () => {
  return (
    <SEO
      title={`Map | ${useSiteMetadata().title}`}
      description="Find our store location, rental location and parking areas near you with our map. Our map shows you all the important details you need to know about each location, including hours of operation, contact information and more"
    />
  )
}
