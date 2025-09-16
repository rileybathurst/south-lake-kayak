import * as React from "react";
import { type PaddleLocationCardTypes, PaddleLocationDeck } from "@rileybathurst/paddle";
import { graphql, useStaticQuery } from "gatsby";

type locationDeckTypes = {
  allStrapiLocation: {
    nodes: PaddleLocationCardTypes[];
  };
};
const LocationDeck = ({ allStrapiLocation }: locationDeckTypes) => {

  const { strapiLocale } = useStaticQuery(graphql`
    query locationDeckQuery {
      strapiLocale(slug: {eq: "south-tahoe"}) {
        name
        season_start
        season_end
        phone
      }
    }
  `);

  return (
    <PaddleLocationDeck
      season_start={strapiLocale.season_start}
      season_end={strapiLocale.season_end}
      phone={strapiLocale.phone}
      nodes={allStrapiLocation.nodes}
    />
  );
}

export default LocationDeck;