// TOD: I started moving this to starpi but it needs some more thought

import * as React from "react"
import { Link, Script, graphql, useStaticQuery } from "gatsby"
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import Markdown from "react-markdown";
import Header from "../../components/header";
import Footer from "../../components/footer";

const InformationPage = () => {

  const { allStrapiPaddleInfo } = useStaticQuery(graphql`
    query allStrapiPaddleInfoQuery {
      allStrapiPaddleInfo {
        nodes {
          title
          info {
            data {
              info
            }
          }
        }
      }
    }
  `);

  interface InfoTypes {
    id: React.Key;
    title: string;
    info: {
      data: {
        info: string;
      };
    };
  }

  return (
    <>
      <Header />

      {/* this page could use accordions to make it easier to read */}

      <main className="pelican">
        <h1>Paddlesports Information</h1>
        <h2>Before you go!</h2>

        <ul className="condor">
          {allStrapiPaddleInfo.nodes.map((info: InfoTypes) => (
            <li key={info.id}>
              <h2>{info.title}</h2>
              <Markdown className='reeact-markdown'>
                {info.info.data.info}
              </Markdown>
            </li>
          ))
          }
        </ul>
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Paddlesports Information</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default InformationPage

export const Head = () => {
  return (
    <SEO
      title='Information'
      // TODO: this would be interesting to do with a map of the faq at the top question level
      description="Before you go. Dress for Success. Weather and Navigation. Basic Paddling Tips. Kayak Paddle Strokes. Tandem Kayaking – Its about communication. Safety on the Water. Stay Hydrated"
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Paddlesports Information', item: 'about/information' }
      ]}
    >

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
              "name": "Information",
            }]
          }
        `}
      </Script>

    </SEO>
  )
}
