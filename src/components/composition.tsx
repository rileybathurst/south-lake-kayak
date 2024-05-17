import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import WaterTexture from "../images/watertexture";
import Kayaker from "../images/kayaker";
import Supper from "../images/supper";
import { useStrapiTextures } from "../hooks/use-strapi-textures"

function Paddler({ sport }: CompositionTypes) {
  if (sport === "paddleboard") {
    return <Supper className="paddler" />
  }

  return <Kayaker className="paddler" />
}

function TopThree(props: { className: string; }) {

  const { query } = useStrapiTextures()
  // console.log(query.baseone);

  return <GatsbyImage
    image={query.topthree.image.localFile.childImageSharp.gatsbyImageData}
    alt="deepwater texture"
    className={`texture-slice crops ${props.className}`}
    objectFit="contain"
  />
}

interface CompositionTypes {
  sport?: string;
  tour?: string;
}
const Composition = ({ sport, tour }: CompositionTypes) => {
  return (
    <div className="composition">
      <WaterTexture className="texture-1" />
      <TopThree className="texture-2 img__wrapped" />
      <Paddler sport={sport} tour={tour} />
    </div>
  )
}

export default Composition