import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SportFeatureList from "./sport-feature-list";

// TODO: eventually I could do something to not show the page its on but for now I'll leave it like this

export default function KayakFeatureList() {

  const { allStrapiAttribute } = useStaticQuery(graphql`
    query allStrapiAttributeKayak {
      allStrapiAttribute(filter: {type: {eq: "kayak"}}) {
        nodes {
          id
          name
          slug
          type
        }
      }
    }
  `)

  return (
    <SportFeatureList sport={allStrapiAttribute} />
  )
}
