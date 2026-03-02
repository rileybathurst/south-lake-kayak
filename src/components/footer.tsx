import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// Paddle
import { PaddleLocationDeck } from "@rileybathurst/paddle";
import { PaddleSocials } from "@rileybathurst/paddle";

import MenuList from "./menu-list";
import Logo from "../images/logo";
import Phone from "./phone";
import PricingChart from "./pricing-chart";

const Footer = () => {

  const data = useStaticQuery(graphql`
    query FooterQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        email
        instagram
        facebook
        tripadvisor
        season_start
        season_end
      }

      allStrapiBranch(filter: {slug: {ne: "south-tahoe"}}) {
        nodes {
          name
          url
        }
      }

      allStrapiLocation(
        filter: {
          branch: {slug: {eq: "south-tahoe"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          id
          name
          link
          svg
          opening_time
          closing_time

          streetAddress
          addressLocality
          addressRegion
          postalCode
          commonName

          description {
            data {
              description
            }
          }
          
          branch {
            season_start(formatString: "MMMM DD, YYYY")
            season_end(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `)

  interface BranchTypes {
    name: string,
    url: string
  }

  return (
    <footer>
      <section>
        <div className="logo-container logo-container_footer">
        <h3 className='sr-only'>
          <Link to="/">{data.strapiBranch.name}</Link>
        </h3>
        
        <Link to="/" className="logo-link"><Logo /></Link>
        <p>&copy; {new Date().getFullYear()}</p>
        </div>
        <hr />
        <nav>
          <MenuList />
        </nav>
        <hr />
        <div className="footer__contact">
          <Phone />
          <a
            href={`mailto:${data.strapiBranch.email}`}
            rel="norel norefferer"
            className="button"
          >
            {data.strapiBranch.email}
          </a>
          <PaddleSocials
            instagram={data.strapiBranch.instagram}
            facebook={data.strapiBranch.facebook}
            tripadvisor={data.strapiBranch.tripadvisor}
          />
        </div>
        <hr />
        <div className="footer__locations">
          <h3>Our Partner Locations</h3>
          <ul>
            {data.allStrapiBranch.nodes.map((branch: BranchTypes) => (
              <li key={branch.name}>
                <a href={branch.url}
                  target="_blank"
                  rel='noopener noreferrer'
                >
                  {branch.name} Kayak & Paddleboard
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <PricingChart />
        <hr />

        <PaddleLocationDeck
          background={false}
          season_start={data.strapiBranch.season_start}
          season_end={data.strapiBranch.season_end}
          {...data.allStrapiLocation}
        />
      </section>

    </footer >
  )
}

export default Footer
