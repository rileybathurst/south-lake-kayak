import * as React from "react"

const Remainder = (props: { inches: number }) => {
  if (props.inches) {
    let inches = props.inches;
    let feet = Math.floor(inches / 12);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
    let leftover = inches % 12;

    if (leftover === 0) {
      return (
        <>
          {feet}'&thinsp;
        </>
      )
    } else {
      return (
        <>
          {feet}'&thinsp;{leftover}"&thinsp;
        </>
      )
    }
  }
  else {
    return null;
  }
}

export default Remainder
