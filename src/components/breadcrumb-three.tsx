import React from 'react'
import { Script } from 'gatsby'
import { useSiteUrl } from "../hooks/use-site-url";

const BreadcrumbThree = (props) => {

  let OneCap = props.one[0].toUpperCase() + props.one.slice(1);

  // Conditional (ternary) operator
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
  let TwoCap = (props.two === "sup") ? "Paddleboard" : props.two[0].toUpperCase() + props.two.slice(1);
  let ThreeCap = props.three[0].toUpperCase() + props.three.slice(1);

  return (
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "${OneCap}",
            "item": "${useSiteMetadata().url}/${props.one}"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${TwoCap}",
            "item": "${useSiteMetadata().url}/${props.one}/${props.two}/"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "${ThreeCap}"
          }]
        }
      `}
    </Script>
  )
}

export default BreadcrumbThree
