import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import CarIcon from "../../images/car";

const Parking = () => {

  const { strapiSouthLakeLocation } = useStaticQuery(graphql`
    query strapiSouthLakeLocationParkingQuery {
      strapiSouthLakeLocation {
        parking_location
        parking_google_maps_link
      }
    }
  `)

  return (
    <section className="location">
      {/* // TODO: needs a heading for a section */}
      <a href={strapiSouthLakeLocation.parking_google_maps_link} rel="noopener noreferrer" aria-label="free parking lot map icon">
        <span className='sr-only'>Google Maps Link</span>
        <CarIcon />
      </a>
      <div>
        <h3 className="vinson_massif">Free Parking Lot</h3>
        <p>
          <a href={strapiSouthLakeLocation.parking_google_maps_link} rel="noopener noreferrer" aria-label="free parking lot location">
            {strapiSouthLakeLocation.parking_location}
          </a>
        </p>
      </div>
    </section>
  )
}

export default Parking
