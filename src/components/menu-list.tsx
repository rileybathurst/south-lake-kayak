import * as React from "react"
import { Link } from "gatsby"
import BookNow from "./peek/book-now"

// TODO: using {location.pathname} we can get the current path and use it to set the active class on the menu item

const MenuList = () => {
  return (
    <ul className="menu-list">
      <li><Link to="/rentals" className='link__backed' activeClassName="active">Rentals</Link></li>
      <li><Link to="/tours-lessons" className='link__backed' activeClassName="active">Tours &amp; Lessons</Link></li>
      <li><Link to="/retail" className='link__backed' activeClassName="active">Retail</Link></li>
      <li><Link to="/about" className='link__backed' activeClassName="active">About Us</Link></li>
      <li><BookNow /></li>
    </ul>
  )
}

export default MenuList
