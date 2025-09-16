import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { PaddleSEO } from "@rileybathurst/paddle";

type SEOtypes = {
  title?: string,
  description?: string,
  url?: string,
  og_image?: string,
  og_image_description?: string,
  breadcrumbs?: {
    name: string;
    item: string;
  }[],
  children?: React.ReactNode,
};
export const SEO = ({ title, description, og_image, og_image_description, breadcrumbs, children }: SEOtypes) => {

  const data = useStaticQuery(graphql`
    query SEOQuery {
      strapiBranch(slug: {eq: "south-tahoe"}) {
        name
        url
        og_image
        og_image_description
        latitude
        longitude
        geo_radius
        theme_color
        number_of_employees
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
        // og_image={og_image || null}
        // og_image_description={og_image_description || null}
        {...data}
      >
        {children}
      </PaddleSEO>
    </>
  );
};
