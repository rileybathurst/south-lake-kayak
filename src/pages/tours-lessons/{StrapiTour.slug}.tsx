import * as React from "react"
import { graphql, Script } from "gatsby"
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
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
    }

    allStrapiTour(filter: {slug: {nin: [$slug] }}, sort: {featured: ASC},) {
      nodes {
        ...tourCard
      }
    }
  }
`

const TourPage = ({ data }) => {
  const tour = data.strapiTour;
  const other = data.allStrapiTour;
  return (
    <TourView
      tour={tour}
      other={other}
    />
  );
};

export default TourPage;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiTour.name} | ${useSiteMetadata().title}`}
      description={data.strapiTour.excerpt}
      // TODO image
      // github copilot gave me the extra
      image={data.strapiTour.ogimage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
      imageAlt={data.strapiTour.ogimage.alternativeText}
    >
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
                  "name": "Tours Lessons"
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
  )
}