import * as React from "react"
import { Link } from "gatsby"

import Phone from "../phone";
import ShippingIcon from "../../images/shipping";

const Parking = () => {
  return (
    <section className="location delivery">
      {/* // TODO: needs a heading element */}
      {/* // TODO: js link these together for css hover */}
      <Link to="/delivery"><ShippingIcon /></Link>
      <p><Link to="/delivery"><strong>Delivery</strong></Link><br />
        We can deliver retail or rental watercraft to homes or beaches throughout the region.
      </p>
    </section >
  )
}

export default Parking
