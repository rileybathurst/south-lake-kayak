import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Phone from "./phone";
import Mail from "./mail";
import LocationDeck from "./location-deck";

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
        email
      }

      allStrapiLocale(filter: {slug: {ne: "south-lake"}}) {
        nodes {
          name
        }
      }

      strapiLocale(slug: {eq: "south-lake"}) {
        email
      }

      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "south-lake"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCard
        }
      }
    }
  `)

  return (
    <footer>
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
          <Phone />
          <a
            href={`mailto:${data.strapiLocale.email}`}
            rel="norel norefferer"
            className="button"
          >
            {data.strapiLocale.email}
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
                <Link to={`https:tahoecitykayak.com`}>{locale.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <PricingChart book={false} />
        <hr />

        <LocationDeck
          locations={data.allStrapiLocation}
          background={false}
        />
      </section>

    </footer >
  )
}

export default Footer
