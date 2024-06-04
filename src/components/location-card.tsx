// TODO: Season is super broken

import * as React from "react"
import { Link } from 'gatsby';
import Markdown from "react-markdown";
import HourMin from "./hour-min";
import type { LocationCardTypes } from "../types/location-card-types";
import Phone from "./phone";

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
}
function Content({ svg, name, address, description, opening_time, closing_time, locale }: ContentTypes) {
  return (
    <>

      <div
        className="svg"
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <div>
        <h3 className="elbrus">{name}</h3>
        <Markdown className="react-markdown">
          {address.data.address}
        </Markdown>
      </div>

      <div>
        <Season
          season_start={locale.season_start}
          season_end={locale.season_end}
          opening_time={opening_time}
          closing_time={closing_time}
          name={name}
        />
        <br />
        <Markdown
          className="react-markdown"
        >
          {description.data.description}
        </Markdown>
        {/* // TODO: add phone but dont break the link on link rule {name === "On Water Rental" ? <Phone /> : null} */}
      </div>
    </>
  )
}

function LocationCard({ svg, name, link, address, description, opening_time, closing_time, locale, background }: LocationCardTypes) {

  if (link.includes('http')) {
    return (
      <a
        href={link}
        className={`location ${background}`}
        title={name}
      >
        <Content
          svg={svg}
          name={name}
          address={address}
          description={description}
          opening_time={opening_time}
          closing_time={closing_time}
          locale={locale}
        />
      </a>
    )
  }

  return (
    <Link
      to={`/${link}`}
      className={`location ${background}`}
    >
      <Content
        svg={svg}
        name={name}
        address={address}
        description={description}
        opening_time={opening_time}
        closing_time={closing_time}
        locale={locale}
      />
    </Link>
  )
}

export default LocationCard