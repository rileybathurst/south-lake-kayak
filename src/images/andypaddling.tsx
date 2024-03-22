import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image"
import { useStrapiAndy } from "../hooks/use-strapi-andy";

const AndyPaddling = (props) => {

  const { title, image } = useStrapiAndy()

  return (
    <GatsbyImage
      // src="../images/andy-paddling.webp"
      // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/andy-paddling.jpg"
      image={image?.localFile?.childImageSharp?.gatsbyImageData}
      alt={title}
      className={`img__wrapped ${props.className}`}
    />
  );
};

export default AndyPaddling;