import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import { useSiteMetadata } from "../hooks/use-site-metadata"
import AllLocations from "./all-locations";

const PhoneIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
  )
}

const MailIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
  )
}

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

  const data = useStaticQuery(graphql`
  query FooterQuery {
    strapiLocale(slug: {eq: "south-lake"}) {
      phone
      email
    }

    allStrapiLocale(filter: {slug: {ne: "south-lake"}}) {
      nodes {
        name
      }
    }
  }
`)

  return (
    <footer>
      {/* holds together a flex */}
      <section>
        <h3 className='sr-only'>
          <Link to="/">{useSiteMetadata().title}</Link>
        </h3>
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        <hr />
        <nav>
          <MenuList />
        </nav>
        <hr />
        <div className="footer__contact">
          <a
            href={`tel:${data.strapiLocale.phone}`}
            className="button"
          >
            <PhoneIcon /> {data.strapiLocale.phone}
          </a>
          <a
            href={`mailto:${data.strapiLocale.email}`}
            className="button"
          >
            <MailIcon /> {data.strapiLocale.email}
          </a>
          <div className="social">
            <Facebook />
            <Instagram />
          </div>
        </div>
        <hr />
        <div className="footer__locations">
          <h3>Our Partner Locations</h3>
          <ul>
            {data.allStrapiLocale.nodes.map((locale) => (
              <li key={locale.name}>
                <Link to={`/${locale.name.toLowerCase()}`}>{locale.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <PricingChart book={false} />
        <hr />

        <AllLocations />
      </section>

    </footer >
  )
}

export default Footer
