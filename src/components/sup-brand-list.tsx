// TODO: combine these together with kayak-brand-list.tsx

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

import Danger from "./danger";

const SupBrandList = () => {

  const { allStrapiBrand } = useStaticQuery(graphql`
    query SupBrandQuery {
      allStrapiBrand(filter: {sup: {eq: true}}) {
        nodes {
          id
          name
          slug
          svg
        }
      }
    }
  `)

  return (
    <ul className='brand_list'>
      {allStrapiBrand.nodes.map(sup => (
        <li key={sup.id}>
          <Link to={`/retail/sup/${sup.slug}`}>
            <Danger svg={sup.svg} />
            <p>{sup.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SupBrandList
