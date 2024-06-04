import * as React from "react"
import LocationCard from "./location-card";
import type { LocationCardTypes } from "../types/location-card-types";

interface LocationDeckTypes {
  background?: string;
  nodes?: LocationCardTypes[];
}

function LocationDeck({ background, nodes }: LocationDeckTypes) {
  if (!nodes) return null;
  return (
    <section className="location-deck">
      {nodes.map((location: LocationCardTypes) => (
        <LocationCard
          key={location.id}
          background={background}
          {...location}
        />
      ))}
    </section>
  )
}

export default LocationDeck
