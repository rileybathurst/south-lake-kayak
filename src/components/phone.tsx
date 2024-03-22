import * as React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Phone = () => {

  return (
    <a
      href={`tel:${useSiteMetadata().telephone}`}
      rel="norel norefferer"
      className="button"
    >
      Phone: {useSiteMetadata().telephone}
    </a>
  )
}

export default Phone
