import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { PaddleSEO } from "@rileybathurst/paddle";

type SEOtypes = {
  title?: string,
  description?: string,
  url?: string,
  ogImage?: string,
  ogImageDescription?: string,
  breadcrumbs?: {
    name: string;
    item: string;
  }[],
  children?: React.ReactNode,
};
export const SEO = ({ title, description, ogImage, ogImageDescription, breadcrumbs, children }: SEOtypes) => {

  const data = useStaticQuery(graphql`
    query SEOQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        url
        ogImage
        ogImageDescription
        latitude
        longitude
        geoRadius
        themeColor
        numberOfEmployees
        phone
        email

        topbar {
          data {
            topbar
          }
        }
      }

      strapiLocation(
        branch: {slug: {eq: "south-tahoe"}}
        name: {eq: "On Water Rental"}
      ) {
        opening_time
        closing_time

        streetAddress
        addressLocality
        addressRegion
        postalCode

        paymentAccepted
      }
    }
  `);

  return (
    <>
      <html lang="en" />
      <body className="south-tahoe" />
      <PaddleSEO
        title={title || null}
        description={description || null}
        breadcrumbs={breadcrumbs || null}
        // ogImage={ogImage || null}
        // ogimagedescription={ogImagedescription || null}
        {...data}
      >
        {children}
      </PaddleSEO>
    </>
  );
};
