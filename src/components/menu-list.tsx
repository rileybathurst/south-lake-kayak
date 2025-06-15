import * as React from "react"
import { Link } from "gatsby"
import BookNow from "./peek/book-now"

const MenuList = () => {
  return (
    <ul className="menu-list">
      {/* // TODO: repeated classname doesnt have to be there */}
      <li key="rentals"><Link to="/rentals" className='link__backed' activeClassName="active">Rentals</Link></li>
      <li key="tours"><Link to="/tours" className='link__backed' activeClassName="active">Tours</Link></li>
      <li key="about"><Link to="/about" className='link__backed' activeClassName="active">About Us</Link></li>
      <li key="book"><BookNow /></li>
    </ul>
  )
}

export default MenuList
