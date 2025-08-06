// * this takes the default queries I would have to pull way too many times without

import * as React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { PaddleComposition, type GatsbyImageType } from "@rileybathurst/paddle";

type compositionTypes = {
  sport?: string;
  image?: GatsbyImageType;
}
const Composition = ({ sport, image }: compositionTypes) => {

  const data = useStaticQuery(graphql`
    query {
      paddleboarder: strapiImagegrab(title: {eq: "supper"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1)
            }
          }
          alternativeText
        }
      }
      
      kayaker: strapiImagegrab(title: {eq: "hero2025"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1)
            }
          }
          alternativeText
        }
      }

      sand: strapiImagegrab(title: {eq: "TopThree"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }

      water: strapiImagegrab(title: {eq: "WaterTexture"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

    }
  `)

  return (
    <PaddleComposition
      sport={sport}
      image={image}
      defaultPaddleboarder={data.paddleboarder}
      defaultKayaker={data.kayaker}
      sandTexture={data.sand}
      waterTexture={data.water}
    />
  )
}

export default Composition