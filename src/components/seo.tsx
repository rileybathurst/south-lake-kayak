import React from "react";
import { Script } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata";
// this throws a VS Code error but is as documented here:
// https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#create-a-usesitemetadata-hook

import SEOShowcase from "seo-showcase"

interface SEO {
  title?: string;
}

// add types to the SEO const
export const SEO = (SE0: SEO) => {

  const {
  } = useSiteMetadata()

  const seo = {
    title: SE0.title,
  };

  return (
    <>
      <title>{seo.title}</title>
      {SE0.children}
    </>
  );
};

// priceRange
// review
// url