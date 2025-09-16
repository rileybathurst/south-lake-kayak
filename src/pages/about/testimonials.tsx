// TODO: styling

import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { SEO } from "../../components/seo";
import { PaddleTestimonials } from "@rileybathurst/paddle";
import Header from "../../components/header";
import Footer from "../../components/footer";

const FaqPage = () => {

  const { allStrapiTestimonial } = useStaticQuery(graphql`
    query TestimonialsQuery {
      allStrapiTestimonial(filter: {branch: {slug: {eq: "south-tahoe"}}}) {
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

      <main>
        <h1>Testimonials</h1>
        <hr />

        <PaddleTestimonials {...allStrapiTestimonial} />
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
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Testimonials', item: 'about/testimonials' }
      ]}
    >
    </SEO>
  )
}
