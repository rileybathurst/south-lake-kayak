import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PaddlePricingChart } from "@rileybathurst/paddle"

const PricingChart = () => {

  const data = useStaticQuery(graphql`
    query PricingChartQuery {
      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          id
          item
          oneHour
          threeHour
          fullDay
          pedalAdd

          branches {
            slug
          }

          retail {
            slug
            sport {
              slug
            }
            brand {
              slug
            }
          }
        }
      }

      strapiBranch(slug: {eq: "south-tahoe"}) {
        slug
      }
    }
  `)

  return (
    <PaddlePricingChart
      rentalRates={data.allStrapiRentalRate}
      branches={data.strapiBranch.slug}
    />
  )
}

export default PricingChart
