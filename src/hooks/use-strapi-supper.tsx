import { graphql, useStaticQuery } from "gatsby"

export const useStrapiSupper = () => {
  const { strapiImagegrab } = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "supper"}) {
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