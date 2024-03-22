import * as React from "react"

import StoreIcon from "../../images/store";

const Store = () => {
  return (
    <section className="location">
      {/* // TODO: needs a heading element */}
      <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" aria-label="retail location icon">
        <span className='sr-only'>Google Maps Link</span>
        <StoreIcon />
      </a>
      <p>
        <strong>Retail Location</strong><br />
        <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" >
          521 North Lake Blvd,<br className="no-below-vulture" />
          <span className="only-below-vulture">&nbsp;</span>
          Tahoe City 96145</a>
      </p>

      <p>
        Open Daily<br />
        9am &ndash; 6pm<br />
      </p>
    </section>
  )
}

export default Store
