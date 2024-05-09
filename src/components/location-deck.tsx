import * as React from "react"
import LocationCard from "./location-card"

function LocationDeck({ locations, background }) {

  return (
    <section className="location-deck">
      {locations.nodes.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          background={background}
        />
      ))}
    </section>
  )
}

export default LocationDeck