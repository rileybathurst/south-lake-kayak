import * as React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Phone = () => {
  if (useSiteMetadata().telephone) {
    return (
      <a
        href={`tel:${useSiteMetadata().telephone}`}
        rel="norel norefferer"
        className="button"
      >
        Phone: {useSiteMetadata().telephone}
      </a>
    )
  } else {
    return null
  }
}

export default Phone
