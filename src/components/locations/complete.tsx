// * these are weirdly complex so Im keeping them in HTML instead of the CMS

import * as React from "react"

import Rentals from "./rentals";
import Store from "./store";
import Parking from "./parking";
import Delivery from "./delivery";

const Complete = () => {
  return (
    <div className="locations__complete">
      <Rentals />
      <Parking />
      <Delivery />
    </div>
  )
}

export default Complete
