import * as React from "react"
import { Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import { useStrapiFaq } from "../../hooks/use-strapi-faq";

import Header from "../../components/header";
import Footer from "../../components/footer";

import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";


const FaqPage = () => {

  let title = "Frequently Asked Questions";
  let parent = "about";

  return (
    <>
      <Header />

      <main>
        <h1>{title}</h1>

        {/* // TODO links to delivery and demos */}

        <ul className="faq">

          {useStrapiFaq().nodes.map((faq:
            {
              id: string;
              question: string;
              answer: string;
            }) => (
            <li key={faq.id}>
              <h2>{faq.question}</h2>
              <p>
                <span>{faq.answer}</span>
              </p>
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
  )
}

export default FaqPage

export const Head = () => {

  // console.log(useStrapiFaq);

  return (
    <SEO
      title={`Frequently Asked Questions | ${useSiteMetadata().title}`}
      description="Get answers to your questions about kayaking and paddleboarding in Lake Tahoe with Tahoe City Kayak and Paddleboards frequently asked questions page. Learn about our kayak and paddleboard rentals, sales, lessons, tours, and storage options."
    >

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${useStrapiFaq().nodes.map((faq: { question: string; answer: string; }) => (
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

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "About",
              "item": "${useSiteMetadata().url}/about"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Frequently Asked Questions"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
