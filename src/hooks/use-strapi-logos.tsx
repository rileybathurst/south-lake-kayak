import { graphql, useStaticQuery } from "gatsby"

export const useStrapiLogos = () => {
  const query = useStaticQuery(graphql`
    query LogosQuery {
      logoLight: strapiImagegrab(title: {eq: "logoLight"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 294
                transformOptions: {fit: CONTAIN}
              )
            }
          }
        }
      }

      logoDark: strapiImagegrab(title: {eq: "logoDark"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 294)
            }
          }
        }
      }

    }
  `)

  return { query }
}