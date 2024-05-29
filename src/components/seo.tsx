import React from "react";
import { Script } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SEO {
  title?: string;
  children?: React.ReactNode;
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