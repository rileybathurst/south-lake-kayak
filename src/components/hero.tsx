import * as React from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type heroDataTypes = {
  strapiBranch: {
    hero: PaddleGatsbyImageType
  }
}

type HeroTypes = {
  image?: PaddleGatsbyImageType
  collage?: PaddleGatsbyImageType | null
  overlay?: React.ReactNode
}

const Hero = ({ image, collage, overlay }: HeroTypes) => {

  const data: heroDataTypes = useStaticQuery(graphql`
    query HeroQuery {

      strapiBranch(slug: {eq: "south-tahoe"}) {
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `);

  return (
    <PaddleHero
      image={image ? image : data.strapiBranch.hero}
      collage={collage || undefined}
      overlay={overlay ? overlay : undefined}
    />
  )
}

export default Hero