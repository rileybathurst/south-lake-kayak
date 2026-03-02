import * as React from "react"

interface HourMinTypes {
  time?: string | null;
}
const HourMin = ({ time }: HourMinTypes) => {
  if (time) {
    let hours = time.split(':')[0];
    const mins = time.split(':')[1];
    const ampm = parseInt(hours) >= 12 ? 'pm' : 'am';

    if (parseInt(hours) < 10) {
      hours = hours.replace('0', '');
    } else if
      (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    }

    return (
      <>{hours}:{mins}{ampm}</>
    );
  }

  return null;

}

export default HourMin
