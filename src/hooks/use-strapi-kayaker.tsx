import { graphql, useStaticQuery } from "gatsby"

export const useStrapiKayaker = () => {
  const { strapiImagegrab } = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "kayaker"}) {
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