import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import KayakIcon from "../../images/kayak"
import MapLink from "../map-link"

const Rentals = () => {

  const data = useStaticQuery(graphql`
    query strapiSouthLakeLocationOnWaterQuery {
      location: strapiSouthLakeLocation {
        open

        on_water_location
        on_water_google_map_link

        daily_opening
        daily_closing
      }

      string: strapiSouthLakeLocation {
        season_start(formatString: "MMMM")
        season_end(formatString: "MMMM")
      }

      number: strapiSouthLakeLocation {
        season_start(formatString: "MM")
        season_end(formatString: "MM")
      }
    }
  `)

  return (
    <section className="location">
      {/* // TODO: needs a heading element */}
      {/* // TODO: these are html addresses */}
      <MapLink><KayakIcon /></MapLink>
      <div>
        <h3 className="vinson_massif">On Water Rental</h3>
        <address>
          <MapLink>
            {data.location.on_water_location}
          </MapLink>
        </address>
      </div>

      <p>
        {data.location.open ? "Open Daily" : "Closed For The Season"}<br />
        <time dateTime={`${new Date().getFullYear()}-${data.number.season_start}`}>
          {data.string.season_start}
        </time> &ndash; <time dateTime={data.number.season_end}>{data.string.season_end}</time><br />
        <time dateTime={data.location.daily_opening}>{data.location.daily_opening.slice(0, 5)}</time> &ndash; <time dateTime={data.location.daily_closing}>{data.location.daily_closing.slice(0, 5)}</time><br />
        Weather Permitting<br />
      </p>
    </section>
  )
}

export default Rentals
