import React, { useState, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStrapiLogos } from "../hooks/use-strapi-logos";

function LogoLight() {
  const { query } = useStrapiLogos()
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.logoLight.image.localFile.childImageSharp.gatsbyImageData}
    alt="tahoe city kayak and paddleboard logo"
  />
}

function LogoDark() {
  const { query } = useStrapiLogos()
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.logoDark.image.localFile.childImageSharp.gatsbyImageData}
    alt="tahoe city kayak and paddleboard logo"
  />
}

// light to dark switch
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
  }, [matches, query]);

  return matches;
}

function Logo() {
  let isSiteDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      {isSiteDark && <LogoDark />}
      {isSiteDark || <LogoLight />}
    </>
  );
}

export default Logo;