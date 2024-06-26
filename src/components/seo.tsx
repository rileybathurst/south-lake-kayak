import React from "react";
import { Script, useStaticQuery, graphql } from "gatsby";

interface SEO {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: object;
  children?: React.ReactNode;
}

export const SEO = (SE0: SEO) => {

  interface BreadcrumbsTypes {
    breadcrumbs: {
      one: {
        name: string;
        item: string;
      };
      two: {
        name: string;
        item: string;
      };
    };
  }
  function Breadcrumbs({ breadcrumbs }: BreadcrumbsTypes) {
    if (!breadcrumbs) return null;

    // console.log(breadcrumbs);
    return (
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "${breadcrumbs.one.name}",
                "item": "/${breadcrumbs.one.item}"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "${breadcrumbs.two.name}",
                "item": "/${breadcrumbs.one.item}/${breadcrumbs.two.item}"
              }
            ]
          }
        `}
      </Script>
    );
  }

  const data = useStaticQuery(graphql`
    query SEOQuery {
      strapiLocale(slug: {eq: "south-lake"}) {
        name
        url
        ogImage
        ogimagedescription
        latitude
        longitude
        geoRadius
        themeColor
        numberOfEmployees
        phone

        topbar {
          data {
            topbar
          }
        }
      }

      strapiLocation(
        locale: {slug: {eq: "south-lake"}}
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

  const businessName = `${data.strapiLocale.name} Kayak & Paddleboard rentals and tours`;

  const seo = {
    title: SE0.title ? `${SE0.title} | ${businessName}` : `${businessName} | ${data.strapiLocale.topbar.data.topbar} `,
    // TODO: tagline would be a better fallback description
    description: SE0.description || data.strapiLocale.name,
    url: `${data.strapiLocale.url}${SE0.url}` || data.strapiLocale.url,
    image: data.strapiLocale.ogImage || SEO.image,
    imageAlt: data.strapiLocale.ogimagedescription || SEO.imageAlt,
    breadcrumbs: SE0.breadcrumbs || null,
  };

  // const query = '- cash\n - credit card';
  // const formatted = query.split('\n').map((item) => item.trim().replace('- ', '')).join(', ');
  // console.log(formatted);

  // console.log(data.strapiLocation.paymentAccepted);
  const paymentAcceptedQuery = data.strapiLocation.paymentAccepted;
  const paymentAcceptedFormatted = paymentAcceptedQuery.split('\n').map((payment: string) => payment.trim().replace('- ', '')).join(', ');
  // console.log(paymentAcceptedFormatted);

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      {/* // TODO: og:image:alt was missing when tested */}
      {/* https://developers.facebook.com/tools/debug/?q=southtahoekayak.com */}
      <meta property="og:image:alt" content={seo.imageAlt} />

      <meta name="theme-color" content={data.strapiLocale.themeColor} />

      {/* // TODO: logo */}
      {/* // TODO: slogan */}
      {/* // ! test numberOfEmployees */}
      {/* // ! test priceRange */}

      {/* // TODO: offerCatalog */}

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "${businessName}",
            "url": "${data.strapiLocale.url}",
            "description": "${data.strapiLocale.name}",
            "image": "${seo.image}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${data.strapiLocation.streetAddress}",
              "addressLocality": "${data.strapiLocation.addressLocality}",
              "addressRegion": "${data.strapiLocation.addressRegion}",
              "postalCode": "${data.strapiLocation.postalCode}"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "${data.strapiLocale.latitude}",
              "longitude": "${data.strapiLocale.longitude}"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "${data.strapiLocale.latitude}",
                "longitude": "${data.strapiLocale.longitude}"
              },
              "geoRadius": "${data.strapiLocale.geoRadius}"
            },
            "paymentAccepted": "${paymentAcceptedFormatted}",
            "telephone": "${data.strapiLocale.phone}",
            "numberOfEmployees": "10",
            "openingHours": "Mo, Tu, We, Th, Fr, Sa, Su ${data.strapiLocation.opening_time}-${data.strapiLocation.closing_time}",
            "priceRange": "$30-$375"
          }
        `}
      </Script>

      {/* // ? do I have anything but two levels deep? with this maybe */}
      {/* this was being weird inline so i put it in a function i might not need to */}
      {/* {seo?.breadcrumbs ?? */}
      <Breadcrumbs breadcrumbs={seo.breadcrumbs} />
      {SE0.children}
    </>
  );
};
