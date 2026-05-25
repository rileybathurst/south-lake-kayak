import * as React from "react"
import { Link, Script, graphql } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import Header from "../../components/header";
import Footer from "../../components/footer";

type allFaqTypes = {
  data: {
    allStrapiFaq: {
      nodes: {
        id: string;
        question: string;
        answer: string;
      }[]
    }
  }
}

export const data = graphql`
  query useStrapiFaq {
    allStrapiFaq {
      nodes {
        id
        question
        answer
      }
    }
  }
`;

const FaqPage = ({ data }: allFaqTypes) => {
  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Frequently Asked Questions</h1>

        {/* // TODO links to delivery and demos */}
        <ul className="faq condor">
          {data.allStrapiFaq.nodes.map((faq) => (
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

export const Head = ({ data }: allFaqTypes) => {

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

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${data.allStrapiFaq.nodes.map((faq) => (
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
