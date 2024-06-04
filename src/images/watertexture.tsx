import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image"

import { useStrapiWaterTexture } from "../hooks/use-strapi-watertexture";

interface WaterTextureTypes {
  className: string;
}
const WaterTexture = ({ className }: WaterTextureTypes) => {
  const { title, image } = useStrapiWaterTexture()

  return (
    <GatsbyImage
      image={image?.localFile?.childImageSharp?.gatsbyImageData}
      alt={title}
      className={`img__wrapped ${className}`}
    />
  )
};

export default WaterTexture;