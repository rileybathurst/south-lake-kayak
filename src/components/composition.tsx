import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import WaterTexture from "../images/watertexture";
import Kayaker from "../images/kayaker";
import Supper from "../images/supper";
import { useStrapiTextures } from "../hooks/use-strapi-textures"

function Paddler(props: { sport?: string; }) {
  if (props.sport === "sup") {
    return <Supper className="paddler" />
  } else {
    return <Kayaker className="paddler" />
  }
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

const Composition = (props: { sport?: string; }) => {
  return (
    <div className="composition">
      <WaterTexture className="t1" />
      <TopThree className="t2 img__wrapped" />
      <Paddler sport={props.sport} />
    </div>
  )
}

export default Composition