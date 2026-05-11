import * as React from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type heroDataTypes = {
  strapiMedia: PaddleGatsbyImageType
}

type HeroTypes = {
  image?: PaddleGatsbyImageType
  collage?: PaddleGatsbyImageType | null
  overlay?: React.ReactNode
}

const Hero = ({ image, collage, overlay }: HeroTypes) => {

  const data: heroDataTypes = useStaticQuery(graphql`
    query HeroQuery {

      strapiMedia(localFile: {name: {regex: "/South_Tahoe_Kayak_New_Location_00619_67ca700ad6/"}}) {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  `);

  return (
    <PaddleHero
      image={image ? image : data.strapiMedia}
      collage={collage || undefined}
      overlay={overlay ? overlay : undefined}
    />
  )
}

export default Hero