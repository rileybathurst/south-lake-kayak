import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image"

import { useStrapiWaterTexture } from "../hooks/use-strapi-watertexture";

const WaterTexture = (props: { className?: string; }) => {
  const { title, image } = useStrapiWaterTexture()

  return (
    <GatsbyImage
      // src="../images/jason-leung-Oc81QL8Crtg-unsplash-hd.webp"
      // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
      image={image?.localFile?.childImageSharp?.gatsbyImageData}
      alt={title}
      className={`img__wrapped ${props.className}`}
    />
  )
};

export default WaterTexture;