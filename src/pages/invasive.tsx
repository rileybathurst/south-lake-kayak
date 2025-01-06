import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import { GatsbyImage } from "gatsby-plugin-image";

const InvasivePage = () => {

  const { strapiInvasive } = useStaticQuery(graphql`
    query InvasiveQuery {
      strapiInvasive {
        title
        media {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `)

  return (
    <>
      <Header />

      <main>
        <h1>{strapiInvasive.title}</h1>
        <GatsbyImage
          image={strapiInvasive.media.localFile.childImageSharp.gatsbyImageData}
          alt={strapiInvasive.media.alternativeText}
        />
      </main >

      <Footer />
    </>
  )
}

export default InvasivePage

export const Head = () => {
  return (
    <SEO
      title='Invasive Species'
      description="Animals and plants that are not native to the Lake Tahoe Area can have negative effects on our ecosystem through spreading disease, predation, and outcompeting native species for resources."
    />
  )
}
