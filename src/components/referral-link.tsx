// ReactNode removes an error
import React, { type ReactNode } from "react"
import { graphql, useStaticQuery } from "gatsby"

type ReferralLinkProps = {
  link: string
  children: ReactNode
}

type ReferralLinkQueryTypes = {
  strapiBranch: {
    name: string
  }
}

const ReferralLink = ({ link, children }: ReferralLinkProps) => {
  const data: ReferralLinkQueryTypes = useStaticQuery(graphql`
    query ReferralLinkQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
      }
    }
  `)

  const referralHref = `${link}/?=${data.strapiBranch.name}-kayak-paddleboard`

  return (

    <a href={referralHref} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default ReferralLink