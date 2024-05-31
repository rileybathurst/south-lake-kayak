// TODO: this is super broken but needs more work

import * as React from "react"
import { Link } from 'gatsby';
import Markdown from "react-markdown";
import HourMin from "./hour-min";
import type { LocationCardTypes } from "../types/location-card-types";
import Phone from "./phone";

interface DangerSVGTypes {
  svg: string;
}
function DangerSVG({ svg }: DangerSVGTypes) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="svg"
    />
  )
}

interface SeasonTypes {
  season_start: string;
  season_end: string;
  opening_time: string;
  closing_time: string;
  name: string;
}
function Season({ season_start, season_end, opening_time, closing_time, name }: SeasonTypes) {

  if (name === "Free Parking Lot" || name === "Parking" || name === "Delivery") {
    return null;
  }

  // console.log(opening_time);

  /*   if (new Date(season_start) < new Date()) {
      return (
        <p>
          {opening_time ? "Open Daily: " : null}
          <HourMin time={opening_time} />
          {opening_time ? " - : " : null}
          <HourMin time={closing_time} />
        </p>
      )
    } */

  /*   return (
      <p>
        We&apos;re closed for the season:<br />
        We will reopen<br />
        {season_start} - {season_end}<br />
        Weather Permitting
      </p>
    ) */
  return (
    <p>
      {/* {opening_time ? "Open Daily: " : null} */}
      Open Daily 9:30am - 5:30pm<br />
      Weather Permitting
      {/* <HourMin time={opening_time} /> */}
      {/* {opening_time ? " - : " : null} */}
      {/* <HourMin time={closing_time} /> */}
    </p>
  )
}

interface ContentTypes {
  location: {
    svg: string;
    name: string;
    address: {
      data: {
        address: string;
      }
    };
    description: {
      data: {
        description: string;
      }
    };
    opening_time: string;
    closing_time: string;

    locale: {
      season_start: string;
      season_end: string;
    };
  };
}
function Content({ location }: ContentTypes) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: location.svg }}
      />

      <div>
        <h3 className="elbrus">{location.name}</h3>
        <Markdown className="react-markdown">
          {location.address.data.address}
        </Markdown>
      </div>

      <div>
        <Season
          season_start={location.locale.season_start}
          season_end={location.locale.season_end}
          opening_time={location.opening_time}
          closing_time={location.closing_time}
          name={location.name}
        />
        <br />
        <Markdown
          children={location.description.data.description}
          className="react-markdown"
        />
        {location.name === "On Water Rental" ? <Phone /> : null}
      </div>
    </>
  )
}

function LocationCard({ location, background }: LocationCardTypes) {

  // console.log(location);

  if (location?.link?.includes('http')) {
    return (
      <a href={location.link}
        key={location.id}
        className={`location ${background}`}
      >
        <Content location={location} />
      </a>
    )
  }

  return (
    <Link
      key={location.id}
      to={`/${location.link}`}
      className={`location ${background}`}
    >
      <Content location={location} />
    </Link>
  )
}

export default LocationCard