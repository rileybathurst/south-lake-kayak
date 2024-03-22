import { graphql, useStaticQuery } from "gatsby"

// this would be nice to not be 6 different files
// but if I cant get it to work
// I'll just make 6 different files

export const useStrapiTextures = () => {
  const query = useStaticQuery(graphql`
    query TexturesQuery {
      baseone: strapiImagegrab(title: {eq: "BaseOne"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      basetwo: strapiImagegrab(title: {eq: "BaseTwo"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      basethree: strapiImagegrab(title: {eq: "BaseThree"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      topone: strapiImagegrab(title: {eq: "TopOne"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      toptwo: strapiImagegrab(title: {eq: "TopTwo"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      topthree: strapiImagegrab(title: {eq: "TopThree"}) {
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

  return { query }
}