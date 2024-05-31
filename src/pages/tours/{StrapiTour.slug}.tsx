// ? can I block this from creating north lake tours in south lake?

import * as React from "react"
import { graphql, Script, Link } from "gatsby"
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      locale: {slug: {eq: "south-lake"}}
      ) {
      id
      name
      information {
        data {
          information
        }
      }
      start
      finish
      duration
      minimum
      fitness
      peek
      sport
      excerpt
      price
      slug

      ogimage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }

      locale {
        name
      }
    }

    allStrapiTour(
        filter: {
          slug: {nin: [$slug] },
          locale: {slug: {eq: "south-lake"}}
          },
        sort: {featured: ASC},
      ) {
      nodes {
        ...tourCard
      }
    }
  }
`

const TourPage = ({ data }) => {
  console.log(data)

  if (data.strapiTour) {
    // console.log('south lake tour')
    return (
      <TourView
        tour={data.strapiTour}
        other={data.allStrapiTour}
      />
    );
  }

  // console.log('north lake only tour')
  // ! having one inline and one on a template is a mess
  return (
    <>
      <Header />
      <main className="condor">
        {/*         <h2 className="crest">
          <Link to="/tours">Tours</Link> / {params.name}
          </h2> */}

        {/* // TODO: this should be a component */}
        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        {/* // TODO: this is a broken tour page add a set of tours it should be with cards */}
      </main>
      <Footer />
    </>
  );
}

export default TourPage;

export const Head = ({ data }) => {
  if (data.strapiTour) {
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
      // TODO image
      // github copilot gave me the extra
      image={data.strapiTour.ogimage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
      imageAlt={data.strapiTour.ogimage.alternativeText}
    >
      {/* // TODO: new breadcrumbs */}
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
      "@type": "BreadcrumbList",

        "itemListElement":
    [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Retail",
        "item":
        {
          "name": "Tours"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item":
        {
          "name": "${data.strapiTour.name}"
        }
      }
    ]

  }
  `}
      </Script>

    </SEO>
  }
}