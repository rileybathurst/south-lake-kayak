import * as React from "react"

function Sport(props: { sport: string }) {

  if (props.sport === "sup" || props.sport === "sups") {
    return (
      <>Paddleboard</>
    )
  } else {
    return (
      <>{props.sport}</>
    )
  }
}

export default Sport
