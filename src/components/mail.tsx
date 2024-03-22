import * as React from "react"

import { useSiteMetadata } from "../hooks/use-site-metadata"

const Mail = () => {

  return (
    <a
      href={`mailto:${useSiteMetadata().email}`}
      rel="norel norefferer"
      className="button"
    >
      {useSiteMetadata().email}
    </a>
  )
}

export default Mail
