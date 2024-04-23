import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"

import ShippingIcon from "../../images/shipping";

const Parking = () => {

  const ref = useRef();
  const [hoverState, setHoverState] = useState("");

  useEffect(() => {

    // console.log(ref);

    ref.current.onmouseenter = () => {
      console.log("🚁");
      setHoverState("hover");
    }

    ref.current.onmouseleave = () => {
      console.log("✈️");
      setHoverState("");
    }

  }, []);

  return (
    <section className="location">
      {/* // TODO: js link these together for css hover */}
      {/* <Icon /> */}
      <Link
        to="/delivery"
        className={hoverState}
        ref={ref}
      >
        <ShippingIcon />
      </Link>
      <div>
        <h3 className="vinson_massif">
          <Link
            to="/delivery"
            ref={ref}
            className={hoverState}
          >
            Delivery
          </Link>
        </h3>
        <p>
          {/* // TODO: move to the cms */}
          We can deliver retail or rental watercraft to homes or beaches throughout the region.
        </p>
      </div>
    </section >
  )
}

export default Parking
