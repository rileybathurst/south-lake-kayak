import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { PaddleFooter } from "@rileybathurst/paddle";

import { MenuList } from "./menu-list";
import Logo from "../images/logo";

const Footer = ({ topHR }: { topHR?: boolean }) => {

  const data = useStaticQuery(graphql`
    query FooterQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        ...BookNowFragment
        phone
        email
        slug
        
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
          ...locationCardFragment
        }
      }

      allStrapiRentalRate(filter: {favorite: {eq: true}}) {
        nodes {
          ...PricingChartFragment
        }
      }
    }
  `)

  const MenuPlus = [...MenuList,
  { href: "/group", label: "Group" },
  ]

  return (
    <PaddleFooter
      topHR={Boolean(topHR)}
      strapiBranch={data.strapiBranch}
      logo={<Logo />}
      allStrapiBranch={data.allStrapiBranch}
      allStrapiRentalRate={data.allStrapiRentalRate}
      allStrapiLocation={data.allStrapiLocation}
      MenuPlus={MenuPlus}
    />
  )
}

export default Footer
