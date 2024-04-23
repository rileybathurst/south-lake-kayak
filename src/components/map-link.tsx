import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

interface MapLinkClass {
  children: React.ReactNode
  className?: string;
}

const MapLink = (MapLink: MapLinkClass) => {

  const { strapiSouthLakeLocation } = useStaticQuery(graphql`
    query strapiSouthLakeLocationOnWaterGoogleMapLinkQuery {
      strapiSouthLakeLocation {
        on_water_google_map_link
      }
    }
  `)

  return (
    <a
      href={strapiSouthLakeLocation.on_water_google_map_link}
      rel="noopener noreferrer"
      className={MapLink.className}
    >
      <span className='sr-only'>Google Maps Link</span>
      {MapLink.children}
    </a>
  )
}

export default MapLink
