import * as React from "react"

const HourMin = (props: {
  time: any; // Theres probably a really fancy way to do this
}) => {
  if (props.time) {
    let hours = props.time.split(':')[0];
    let mins = props.time.split(':')[1];
    let ampm = hours >= 12 ? 'pm' : 'am';

    if (hours < 10) {
      hours = hours.replace('0', '');
    } else if
      (hours > 12) {
      hours = hours - 12;
    }

    return (
      <>{hours}:{mins}<span className="unit">{ampm}</span></>
    );
  } else {
    return null;
  }
}

export default HourMin
