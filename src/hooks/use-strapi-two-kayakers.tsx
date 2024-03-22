import { graphql, useStaticQuery } from "gatsby"

export const useStrapiTwoKayakers = () => {
  const { strapiImagegrab } = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "Two Kayakers"}) {
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