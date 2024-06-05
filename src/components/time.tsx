// TODO: This is now broken with emerald bay being a mega tour
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#a_valid_time_string
import * as React from "react"
import HourMin from "./hour-min";

interface TimeTypes {
  start?: string | null;
  finish?: string | null;
  duration?: number | null;
  name?: string | null;
}
const Time = ({ start, finish, duration, name }: TimeTypes) => {
  if (name === "Illuminated Full Moon Tour") {
    return (
      <h4>Sunset</h4>
    )
  }

  if (name === "Emerald Bay Boat Camp Overnight") {
    return (
      <h4>Overnight</h4>
    )
  }

  if (start && finish && name !== "Emerald Bay Boat Camp Overnight" && name !== "Illuminated Full Moon Tour") {
    return (
      <h4>
        <time dateTime={start}>
          <HourMin time={start} /> - <HourMin time={finish} />
        </time>
      </h4>
    )
  }

  if (duration) {
    if (duration > 90) {
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;

      return (
        <h4>{hours} hrs {mins > 0 ? `${mins}mins` : null}</h4>
      )
    }

    return (
      <h4>
        {duration} mins
      </h4>
    )
  }
}

export default Time
