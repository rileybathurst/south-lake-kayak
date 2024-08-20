import * as React from "react"
import { Link, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { useStrapiFaq } from "../../hooks/use-strapi-faq";
import Header from "../../components/header";
import Footer from "../../components/footer";

const FaqPage = () => {

  interface FaqTypes {
    id: string;
    question: string;
    answer: string;
  }

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Frequently Asked Questions</h1>

        {/* // TODO links to delivery and demos */}
        <ul className="faq condor">
          {useStrapiFaq().nodes.map((faq: FaqTypes) => (
            <li key={faq.id}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </li>
          ))
          }
        </ul>
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Frequently Asked Questions</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default FaqPage

export const Head = () => {

  type FaqTypes = {
    question: string;
    answer: string;
  }
  return (
    <SEO
      title='Frequently Asked Questions'
      description="Get answers to your questions about kayaking and paddleboarding in Lake Tahoe with Tahoe City Kayak and Paddleboards frequently asked questions page. Learn about our kayak and paddleboard, tours, and storage options."
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Frequently Asked Questions', item: 'about/faq' }
      ]}
    >

      {/* // TODO: move the types */}
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${useStrapiFaq().nodes.map((faq: FaqTypes) => (
          `{
                  "@type": "Question",
                  "name": "${faq.question}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer}"
                  }
                }`
        )).join(',')}
            ]
          }
        `}
      </Script>
    </SEO >
  )
}
