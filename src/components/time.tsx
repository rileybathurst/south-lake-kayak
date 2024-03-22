import * as React from "react"
import HourMin from "./hour-min";

const Time = (props: {
  start?: Date;
  finish?: Date;
  duration?: Date;
}) => {
  if (props.start) {
    return (
      <h4>
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time */}
        <time dateTime={props.start}>
          <HourMin time={props.start} /> - <HourMin time={props.finish} />
        </time>
      </h4>
    )
  } else {
    return (
      <h4>
        {/* This JSX tag's children prop expects single child of type Element, but multiple children were provided */}
        <>
          {props.duration} mins
        </>
      </h4>
    )
  }
}

export default Time
