import * as React from "react";
import { PaddleLocales } from "@rileybathurst/paddle";
import { graphql, useStaticQuery } from "gatsby";
import "../fragments/location-card-fragment";

type locationDeckTypes = {
  all?: boolean;
  delivery?: boolean;
  parking?: boolean;
  water?: boolean;
};

const Locales = ({ all, delivery, parking, water }: locationDeckTypes) => {
  const data = useStaticQuery(graphql`
    query LocalesDeckQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        season_start
        season_end
        phone
      }

      allStrapiLocation(
        filter: {
          branch: {slug: {eq: "south-tahoe"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      water: strapiLocation(
        name: {eq: "On Water Rental"}
        branch: {slug: {eq: "south-tahoe"}}
      ) {
        ...locationCardFragment
      }

      delivery: strapiLocation(
          name: {eq: "Delivery"}
          branch: {slug: {eq: "south-tahoe"}}
      ) {
          ...locationCardFragment
      }

      parking: strapiLocation(
          name: {eq: "Parking"}
          branch: {slug: {eq: "south-tahoe"}}
      ) {
        ...locationCardFragment
      }

    }
  `);

  if (all) {

    return (
      <PaddleLocales
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        nodes={data.allStrapiLocation.nodes}
      />
    );
  }

  // * I've only built out the used versions there are a lot more combos

  if (water) {
    if (parking) {

      return (
        <PaddleLocales
          season_start={data.strapiBranch.season_start}
          season_end={data.strapiBranch.season_end}
          phone={data.strapiBranch.phone}
          nodes={[data.water, data.parking]}
        />
      );
    }

    return (
      <PaddleLocales
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.water}
      />
    );
  }

  if (delivery) {
    return (
      <PaddleLocales
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.delivery}
      />
    );
  }

  if (parking) {
    return (
      <PaddleLocales
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.parking}
      />
    );
  }

  console.error("No matching location found");
  return null;
}

export default Locales;