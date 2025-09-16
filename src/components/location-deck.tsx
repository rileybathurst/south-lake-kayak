import * as React from "react";
import { type PaddleLocationCardTypes, PaddleLocationDeck } from "@rileybathurst/paddle";
import { graphql, useStaticQuery } from "gatsby";

type locationDeckTypes = {
  allStrapiLocation: {
    nodes: PaddleLocationCardTypes[];
  };
};
const LocationDeck = ({ allStrapiLocation }: locationDeckTypes) => {

  const { strapiBranch } = useStaticQuery(graphql`
    query locationDeckQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        season_start
        season_end
        phone
      }
    }
  `);

  return (
    <PaddleLocationDeck
      season_start={strapiBranch.season_start}
      season_end={strapiBranch.season_end}
      phone={strapiBranch.phone}
      nodes={allStrapiLocation.nodes}
    />
  );
}

export default LocationDeck;