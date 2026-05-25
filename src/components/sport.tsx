import * as React from "react"

function Sport(props: { sport: string }) {

  if (props.sport === "sup" || props.sport === "sups") {
    return (
      <React.Fragment>Paddleboard</React.Fragment>
    )
  } else {
    return (
      <React.Fragment>{props.sport}</React.Fragment>
    )
  }
}

export default Sport
