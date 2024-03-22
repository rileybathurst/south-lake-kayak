import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Header from "../../components/header";
import Footer from "../../components/footer";
// import { TestimoialSEO } from "../../seo/testimonial";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";

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

  let title = "Testimonials";
  let parent = "about";

  return (
    <>
      <Header />

      <main>
        <h1>{title}</h1>

        <ul className="testimonials">
          {
            allStrapiTestimonial.nodes.map((testimonial: {
              id: string;
              customer: string;
              testimonial: string;
              sign: string;
              location: string;
            }) => (
              <li key={testimonial.id} >
                <h2>{testimonial.customer}</h2>
                <p>{testimonial.testimonial}</p>
                <p>{testimonial.sign}</p>
                <p>{testimonial.location}</p>
                <hr />
              </li>
            ))
          }
        </ul>
      </main>

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <Footer />
    </>
  );
}

export default FaqPage

export const Head = () => {
  return (
    <SEO
      title={`Testimonials | ${useSiteMetadata().title}`}
      description="Testimonials from our customers."
    >
      {/* <TestimoialSEO /> */}
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "About",
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Testimonials"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
