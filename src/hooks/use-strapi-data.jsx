import { graphql, useStaticQuery } from "gatsby"

export const useStrapiData = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiBrand(name: {eq: "bote"}) {
        name
      }
    }
  `)

  return data.strapiBrand
}