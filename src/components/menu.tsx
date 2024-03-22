import * as React from "react"
import MenuList from "./menu-list"

const Menu = (props) => {
  return (
    <nav className="menu__large">
      <hr className={props.hr} />
      <MenuList />
      <hr />
    </nav>
  )
}

export default Menu
