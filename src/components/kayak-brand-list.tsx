// TODO: combine these together with sup-brand-list.tsx

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// I dont know how dangerous this dangerously set is as its prebuilt
function Danger(props: { svg: string; }) {
  const svg = (props.svg)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

const KayakBrandList = () => {

  const { allStrapiBrand } = useStaticQuery(graphql`
    query KayakBrandQuery {
      allStrapiBrand(filter: {kayak: {eq: true}}) {
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
      {allStrapiBrand.nodes.map((kayak: {
        id: React.Key;
        slug: string;
        svg: string;
        name: string;
      }) => (
        <li key={kayak.id}>
          <Link to={`/retail/kayak/${kayak.slug}`}>
            <Danger svg={kayak.svg} />
            <p>{kayak.name}</p>
            {/* Doubt?! https://caninclude.glitch.me/caninclude?child=p&parent=a */}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default KayakBrandList
