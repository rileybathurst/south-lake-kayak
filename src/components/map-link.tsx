// ? should I combine this with map-store.tsx

import * as React from "react"

// Commons Beach address
const MapLink = (props) => {
  return (
    <a
      href="https://goo.gl/maps/atoK4oyJRbV3EKuK9"
      rel="noopener noreferrer"
      className={props.className}
    >
      <span className='sr-only'>Google Maps Link</span>
      {props.children}
    </a>
  )
}

export default MapLink
