import * as React from "react"

import { useSiteMetadata } from "../hooks/use-site-metadata"

const Mail = () => {
  if (useSiteMetadata().email) {
    return (
      <a
        href={`mailto:${useSiteMetadata().email}`}
        rel="norel norefferer"
        className="button"
      >
        {useSiteMetadata().email}
      </a>
    )
  } else {
    return null
  }
}

export default Mail
