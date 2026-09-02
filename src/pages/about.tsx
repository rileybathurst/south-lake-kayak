import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import { TeamCards } from "../components/team-cards";

const AboutPage = () => {

  const data = useStaticQuery(graphql`
    query AboutQuery {

      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        about {
          data {
            about
          }
        }
      }

      allStrapiTeam {
        nodes {
          ...TeamCardFragment
        }
      }

      strapiTestimonial(branch: {slug: {eq: "south-tahoe"}}) {
        ...TestimonialFragment
      }

      strapiFaq {
        question
        answer
      }

      strapiPolicy {
        title
        markdown {
          data {
            markdown
          }
        }
      }

      strapiProtect {
        title
        excerpt
      }

      strapiConnection(branches: {elemMatch: {slug: {eq: "south-tahoe"}}}, favorite: {ne: true}) {
        name
        excerpt
      }

      strapiJob(branches: {elemMatch: {slug: {eq: "south-tahoe"}}}) {
        title
        description {
          data {
            description
          }
        }
      }

    }
  `)

  /*  */

  return (
    <React.Fragment>
      <Header />

      <Hero />

      <main>
        <h1>About Us</h1>
        <div className="react-markdown">
          <Markdown>{data.strapiBranch.about.data.about}</Markdown>
        </div>
        <ul className="flow panel">
          <li key="faq">
            <h2>
              <Link to="/about/faq">Frequently Asked Questions</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/faq">{data.strapiFaq.question}</Link>
              </h3>
              <p>{data.strapiFaq.answer}</p>
            </section>
            <h5>
              <Link to="/about/faq">Explore More Frequently Asked Questions</Link>
            </h5>
          </li>

          <hr />

          <li key="info">
            <h2>
              <Link to="/about/information">Paddlesports Information</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/information">Dress for Success</Link>
              </h3>
              <ul>
                <li>Properly Fitting Life Jacket (PFD)</li>
                <li>Clothing &ndash; Wear clothing that dries quickly (non&ndash;cotton)</li>
                <li>Sun Protection &ndash; Lake Tahoe reflects sunlight, &amp; UV is stronger at elevation</li>
              </ul>
            </section>
            <Link to="/about/information">Explore More Paddlesports Information</Link>
          </li>

          <hr />

          <li key="policies">
            <h2>
              <Link to="/about/policies">Store Policies</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/policies">{data.strapiPolicy.title}</Link>
              </h3>
              <p>{data.strapiPolicy.markdown.data.markdown}</p>
            </section>
            <Link to="/about/policies">Explore More Store Policies</Link>
          </li>

          <hr />

          <li key="jobs">
            <h2>
              <Link to="/about/jobs">Jobs</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/jobs">{data.strapiJob.title}</Link>
              </h3>
              <p>{data.strapiJob.description.data.description}</p>
            </section>
            <Link to="/about/jobs">Explore More Job Opportunities</Link>
          </li>

          <hr />

          <li key="protect">
            <h2>
              <Link to="/about/protect">Protect Lake Tahoe</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/protect">{data.strapiProtect.title}</Link>
              </h3>
              <p>{data.strapiProtect.excerpt}</p>
            </section>
            <Link to="/about/protect">Explore More Ways to Protect Lake Tahoe</Link>
          </li>

          <hr />

          <li key="testimonials">
            <h2>
              <Link to="/about/testimonials">Testimonials</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/about/faq">{data.strapiTestimonial.customer}</Link>
              </h3>
              <p>{data.strapiTestimonial.testimonial}</p>
            </section>
            <h5>
              <Link to="/about/testimonials">Explore More Testimonials</Link>
            </h5>
          </li>

          <hr />

          <li key='favorites'>
            <h2>
              <Link to="/favorites">Our Favorite Spots off the Water</Link>
            </h2>
            <section className="card">
              <h3>
                <Link to="/favorites">{data.strapiConnection.name}</Link>
              </h3>
              <p>{data.strapiConnection.excerpt}</p>
            </section>
            <Link to="/favorites">Explore More Favorite Spots</Link>
          </li>
        </ul>
      </main>

      <section className="pelican">
        <h3 className="font-serif">
          <Link to="/about/team">
            Team
          </Link>
        </h3>
        <p>Meet the team at {data.strapiBranch.name} Kayak & Paddleboard</p>
        <hr />
      </section>

      <TeamCards />

      <Footer topHR />
    </React.Fragment>
  )
}

export default AboutPage

// * this isnt a https://schema.org/AboutPage as thats about creative works
export const Head = () => {
  return (
    <SEO
      title='About Us'
    // TODO: this needs a query
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
