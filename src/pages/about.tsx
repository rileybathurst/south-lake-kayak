import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import Composition from "../components/composition";

const AboutPage = () => {

  const { strapiLocale } = useStaticQuery(graphql`
    query AboutQuery {

      strapiLocale(slug: {eq: "south-lake"}) {
        about {
          data {
            about
          }
        }
      }

    }
  `)

  return (
    <>
      <Header />
      <main className="albatross wrap">
        <div>
          <div className="condor">
            <h1>About Us</h1>
            <Markdown className="react-markdown">
              {strapiLocale.about.data.about}
            </Markdown>

            <ul>
              <li key="faq"><Link to="/about/faq">Frequently Asked Questions</Link></li>
              <li key="info"><Link to="/about/information">Paddlesports Information</Link></li>
              <li key="policies"><Link to="/about/policies">Store Policies</Link></li>
              <li key="testimonials"><Link to="/about/testimonials">Testimonials</Link></li>
              <li key="team"><Link to="/about/team">Team</Link></li>
              <li key="jobs"><Link to="/about/jobs">Jobs</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <div className="condor">
            <Composition />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage

// this isnt a https://schema.org/AboutPage as thats about creative works
export const Head = () => {
  return (
    <SEO
      title='About Us'
    // TODO: this needs a query which maybe means it needs a hook
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
