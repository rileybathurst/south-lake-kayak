import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";

type deliveryTypes = {
  strapiDelivery: {
    text: {
      data: {
        text: string;
      }
    }
    excerpt: string;
  },
  strapiBranch: {
    email: string;
    phone: number;
  }
}

export const data = graphql`
  query DeliveryQuery {
    strapiDelivery {
      text {
        data {
          text
        }
      }
      excerpt
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      email
      phone
    }
  }
`;

const DeliveryPage = (data: deliveryTypes) => {

  const phoneAndEmailLinks = data.strapiDelivery.text.data.text
    .replaceAll(
      "(phoneLink)",
      `(tel:${data.strapiBranch.phone})`
    )
    .replaceAll(
      "(emailLink)",
      `(mailto:${data.strapiBranch.email})`
    )

  return (
    <>
      <Header />

      <Hero />

      <main>
        <h1>Delivery</h1>
        <div className="react-markdown">

          {/* // * by default this pulls phone links out */}
          <ReactMarkdown
            urlTransform={(url) => url.startsWith("tel:") ? url : defaultUrlTransform(url)}
          >
            {phoneAndEmailLinks}
          </ReactMarkdown>
        </div>
      </main >

      <Footer topHR />
    </>
  )
}

export default DeliveryPage

export const Head = (data: deliveryTypes) => {
  return (
    <SEO
      title='Delivery'
      description={data.strapiDelivery.excerpt}
    // TODO: service areas
    />
  )
}
