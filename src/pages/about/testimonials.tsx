// TODO: styling

import * as React from "react"
import { useStaticQuery, graphql, Script, Link } from 'gatsby';
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";

const FaqPage = () => {

  const { allStrapiTestimonial } = useStaticQuery(graphql`
    query TestimonialQuery {
      allStrapiTestimonial {
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

  const title = "Testimonials";
  const parent = "about";

  interface TestimonialTypes {
    id: string;
    customer: string;
    testimonial: string;
    sign: string;
    location: string;
  }

  return (
    <>
      <Header />

      <main className="condor">
        <h1>{title}</h1>

        <ul className="testimonials">
          {allStrapiTestimonial.nodes.map((testimonial: TestimonialTypes) => (
            <li key={testimonial.id} >
              <h2>{testimonial.customer}</h2>
              <p>{testimonial.testimonial}</p>
              <p>{testimonial.sign}</p>
              <p>{testimonial.location}</p>
              <hr />
            </li>
          ))}
        </ul>
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Testimonials</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
}

export default FaqPage

export const Head = () => {
  return (
    <SEO
      title='Testimonials'
      // ? should this description include business name or what we are working on
      description="Testimonials our the customers."
      breadcrumbs={{
        one: { name: 'About', item: 'about' },
        two: { name: 'Testimonials', item: 'testimonials' }
      }}
    >
    </SEO>
  )
}
