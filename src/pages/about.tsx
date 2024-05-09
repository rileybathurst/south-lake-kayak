import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import Composition from "../components/composition";

const AboutPage = () => {

  const { strapiAbout } = useStaticQuery(graphql`
    query AboutQuery {

      strapiAbout {
        text {
          data {
            text
          }
        }
      }

    }
  `)

  return (
    <>
      <Header />

      <div className="progression">
        <main>
          <h1>About Us</h1>
          {/* // ? I might be able to query this its not the slogan but its almost the same maybe a single strapi */}
          <Markdown
            children={strapiAbout.text.data.text}
            className="react-markdown"
          />

          <ul>
            <li key="faq"><Link to="/about/faq">Frequently Asked Questions</Link></li>
            <li key="info"><Link to="/about/information">Paddlesports Information</Link></li>
            <li key="policies"><Link to="/about/policies">Store Policies</Link></li>
            <li key="testimonials"><Link to="/about/testimonials">Testimonials</Link></li>
            <li key="jobs"><Link to="/about/jobs">Jobs</Link></li>
          </ul>
          <hr />
          {/* <h2>We are here</h2> */}
        </main>


        <Composition />
      </div>

      <div className="about__info">

      </div>

      <Footer />
    </>
  )
}

export default AboutPage

// this isnt a https://schema.org/AboutPage as thats about creative works
export const Head = () => {
  return (
    <SEO
      title={`About Us | ${useSiteMetadata().title}`}
      description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
