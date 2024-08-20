// * strapi block content the top type doesnt have text im not sure how many times you want to nest after that

import * as React from "react"
import { Link, graphql, useStaticQuery } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import Header from "../../components/header";
import Footer from "../../components/footer";

import ReactMarkdown from 'react-markdown';

const PoliciesPage = () => {

  const { allStrapiPolicy } = useStaticQuery(graphql`
    query PoliciesQuery {
      allStrapiPolicy {
        nodes {
          id
          title
          markdown {
            data {
              markdown
            }
          }
        }
      }
    }
  `)

  interface PolicyTypes {
    id: string,
    title: string,
    markdown: {
      data: {
        markdown: string
      }
    }
  }

  return (
    <>
      <Header />
      <main className="condor" >
        <h1>Store Policies</h1>
        {allStrapiPolicy.nodes.map((policy: PolicyTypes) => (
          <article key={policy.id}>
            <h2>{policy.title}</h2>
            {policy.markdown ?
              <ReactMarkdown>
                {policy.markdown.data.markdown}
              </ReactMarkdown>
              : null}
            <hr />
          </article>
        ))}
      </main >

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Store Policies</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default PoliciesPage

export const Head = () => {
  return (
    <SEO
      title='Policies'
      description="Transportation, Tour Booking Procedure and Cancellation Policy."
      breadcrumbs={[
        { name: "About", item: "about" },
        { name: "Policies", item: "about/policies" }
      ]}
    />
  )
}
