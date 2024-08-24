import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import ReactMarkdown from 'react-markdown';

const ProtectPage = () => {

  const { strapiProtect } = useStaticQuery(graphql`
    query ProtectQuery {
      strapiProtect {
        title
        details {
          data {
            details
          }
        }
      }
    }
  `)

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>{strapiProtect.title}</h1>
        <ReactMarkdown>
          {strapiProtect.details.data.details}
        </ReactMarkdown>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Protect</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default ProtectPage

export const Head = () => {

  return (
    <SEO
      title='Frequently Asked Questions'
      description="Get answers to your questions about kayaking and paddleboarding in Lake Tahoe with Tahoe City Kayak and Paddleboards frequently asked questions page. Learn about our kayak and paddleboard rentals, sales, lessons, tours, and storage options."
      // * 2024 version of breadcrumbs
      breadcrumbs={[
        {
          name: "About",
          item: "about"
        },
        {
          name: 'Protect Lake Tahoe',
          item: 'protect'
        }
      ]}
    />
  )
}
