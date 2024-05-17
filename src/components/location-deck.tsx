import * as React from "react"
import LocationCard from "./location-card"
import type { LocationCardTypes } from "../types/location-card-types";

// ? types break my brain sometimes
interface LocationDeckTypes {
  locations: {
    nodes: LocationCardTypes;
    background?: boolean;
  };
  background?: boolean;
}

function LocationDeck({ locations, background }: LocationDeckTypes) {

  interface LocationTypes {
    id: React.Key;
    svg: string;
    name: string;
    address: { data: { address: string } };
    description: { data: { description: string } };
    opening_time: string;
    closing_time: string;
    locale: { season_start: string; season_end: string };
  }

  return (
    <section className="location-deck">
      {locations.nodes.map((location: LocationTypes) => (
        <LocationCard
          key={location.id}
          location={location}
          background={background}
          map={location.map} // Add the 'map' property
          svg={location.svg} // Add the 'svg' property
        />
      ))}
    </section>
  )
}

export default LocationDeck