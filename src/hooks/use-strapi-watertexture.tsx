// TODO: these are used once why am I not querying them directly?

import { graphql, useStaticQuery } from "gatsby"

export const useStrapiWaterTexture = () => {
  const { strapiImagegrab } = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "WaterTexture"}) {
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

  return strapiImagegrab
}