import * as React from "react"
import { Link } from "gatsby"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import Complete from './locations/complete';
import Phone from "./phone";
import Mail from "./mail";
import { useSiteMetadata } from "../hooks/use-site-metadata"

function Facebook() {
  if (useSiteMetadata().social?.facebook) {
    return (
      <a
        href={useSiteMetadata().social.facebook}
        target='_blank' rel='noopener noreferrer'
        aria-label={`${useSiteMetadata().title} facebook`}
      >
        <FacebookIcon />
      </a>
    )
  } else {
    return null
  }
}

function Instagram() {
  if (useSiteMetadata().social?.instagram) {
    return (
      <a
        href={useSiteMetadata().social.instagram}
        target='_blank' rel='noopener noreferrer'
        aria-label={`${useSiteMetadata().title} instagram`}
      >
        <InstagramIcon />
      </a>
    )
  } else {
    return null
  }
}


const Footer = () => {

  return (
    <footer>
      {/* holds together a flex */}
      <div>
        <h3 className='sr-only'>
          <Link to="/">{useSiteMetadata().title}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList />
        </nav>
        {/* <hr /> */}
        <div className="footer__contact">
          <Phone />
          <Mail />
          {/* <hr /> */}
          <div className="social">
            <Facebook />
            <Instagram />
          </div>
        </div>
      </div>
      <div>
        <PricingChart book={false} />
        <hr />
        <section className="home__here" >
          <Complete />
        </section>
      </div>

    </footer >
  )
}

export default Footer
