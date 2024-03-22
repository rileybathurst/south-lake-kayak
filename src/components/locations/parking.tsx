import * as React from "react"

import CarIcon from "../../images/car";

const Parking = () => {
  return (
    <section className="location">
      {/* // TODO: needs a heading for a section */}
      <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer" aria-label="free parking lot map icon">
        <span className='sr-only'>Google Maps Link</span>
        <CarIcon />
      </a>
      <p><strong>Free Parking Lot</strong><br />
        <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd,<br className="no-below-vulture" />
          <span className="only-below-vulture">&nbsp;</span>
          Tahoe City 96145
        </a>
      </p>
      <p><strong>Free On-Street Parking</strong><br />
        In front of the retail store<br className="no-below-vulture" />
        <span className="only-below-vulture">&nbsp;</span>
        North Lake Blvd
      </p>
    </section>
  )
}

export default Parking
