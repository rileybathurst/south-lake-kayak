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
        <Breadcrumb>Protect Lake Tahoe</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default ProtectPage

export const Head = () => {

  return (
    <SEO
      title='Protect Lake Tahoe'
      description="Lake Tahoe is a unique and special environment. Our alpine lake is one of the cleanest and clearest in the world, and we'd like to preserve this place for future generations."
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
