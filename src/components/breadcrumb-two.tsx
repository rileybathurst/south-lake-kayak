import * as React from "react"
import { Script } from 'gatsby'
import { useSiteMetadata } from "../../../hooks/use-site-metadata";;

const BreadcrumbTwo = (props) => {
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
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${props.two}",
          }]
        }
      `}
    </Script>
  )
}

export default BreadcrumbTwo
