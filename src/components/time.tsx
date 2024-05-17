// TODO: This is now broken with emerald bay being a mega tour
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#a_valid_time_string
import * as React from "react"
import HourMin from "./hour-min";

interface TimeTypes {
  start?: string | null;
  finish?: string | null;
  duration?: number | null;
}
const Time = ({ start, finish, duration }: TimeTypes) => {
  if (start && finish) {
    return (
      <time dateTime={start}>
        <HourMin time={start} /> - <HourMin time={finish} />
      </time>
    )
  }

  return (
    <h4>
      {duration} mins
    </h4>
  )
}

export default Time
