import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import SportFeatureList from "./sport-feature-list";

export default function PaddleboardFeatureList() {

  const { allStrapiAttribute } = useStaticQuery(graphql`
      query allStrapiAttributeSUP {
        allStrapiAttribute(filter: {type: {eq: "sup"}}) {
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
