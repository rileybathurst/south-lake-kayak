import * as React from "react"

// Store address
const MapStore = (props) => {
  return (
    <a
      href="https://goo.gl/maps/FVDA3AiFhQiUU3NcA"
      rel="noopener noreferrer"
      className={props.className}
    >
      {props.children}
    </a>
  )
}

export default MapStore
