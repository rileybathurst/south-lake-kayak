import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import PricingChart from "./pricing-chart";
import InstagramIcon from "../images/instagram";
import FacebookIcon from "../images/facebook";
import MenuList from "./menu-list";
import Logo from "../images/logo";
import { useSiteMetadata } from "../hooks/use-site-metadata"
import Phone from "./phone";
import LocationDeck from "./location-deck";
import { PaddleSocials } from "@rileybathurst/paddle";

const Footer = () => {

  const data = useStaticQuery(graphql`
    query FooterQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        name
        email
        instagram
        facebook
        tripadvisor
      }

      allStrapiLocale(filter: {slug: {ne: "south-lake"}}) {
        nodes {
          name
          url
        }
      }

      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "south-lake"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }
    }
  `)

  interface LocaleTypes {
    name: string,
    url: string
  }

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
          <PaddleSocials
            instagram={data.strapiLocale.instagram}
            facebook={data.strapiLocale.facebook}
            tripadvisor={data.strapiLocale.tripadvisor}
          />
        </div>
        <hr />
        <div className="footer__locations">
          <h3>Our Partner Locations</h3>
          <ul>
            {data.allStrapiLocale.nodes.map((locale: LocaleTypes) => (
              <li key={locale.name}>
                <a href={locale.url}
                  target="_blank"
                  rel='noopener noreferrer'
                >
                  {locale.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        {/* // ! testing <PricingChart book={false} /> */}
        <hr />


        <LocationDeck
          background={false}
          {...data.allStrapiLocation}
        />
      </section>

    </footer >
  )
}

export default Footer
