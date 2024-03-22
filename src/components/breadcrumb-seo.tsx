// ! this isnt used am I still working on it or skipping it?

import * as React from "react"
import { Script } from 'gatsby'
import { useSiteMetadata } from "../../../hooks/use-site-metadata";

const BreadcrumbSEO = (props) => {
  return (
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "${props.one}",
            "item": "${useSiteMetadata().url}/${props.one}"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${props.two}",
            "item": "${useSiteMetadata().url}/${props.one}/${props.two}/"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "${props.child}"
          }]
        }
      `}
    </Script>
  )
}

export default BreadcrumbSEO
