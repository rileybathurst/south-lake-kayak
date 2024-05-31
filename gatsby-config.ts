import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    "attribute",
    "blog",
    "faq",
    "imagegrab",
    "locale",
    "location",
    "paddle-info",
    "policy",
    "rental-addon",
    "rental-rate",
    "sport",
    "testimonial",
    "topbar",
    "tour",
    "event",
  ],
  singleTypes: ["about", "experience", "shop", "rental"],
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: "South Lake Tahoe Kayak and Paddleboard",
    url: "https://southtahoekayak.com/",
    logo: "/images/icon.png",
    localeSlug: "south-lake",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    // "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-strapi",
      options: strapiConfig,
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require("autoprefixer"),
          require("postcss-nested"),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-csp",
      options: {
        mergeSecurityHeaders: true, // ? testing may 2024 csp issue
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          "script-src":
            "'self' 'unsafe-inline'  www.google-analytics.com book.peek.com book12.freetls.fastly.net",
          "frame-src": "'self' book.peek.com",
          "style-src":
            "'self' 'unsafe-inline' book12.freetls.fastly.net localhost:8000",
          "font-src": "'self' data: 'unsafe-inline'",
          "img-src": "'self' https://www.google-analytics.com data: about:", // ? I think  is a tracking pixel
          "connect-src": "'self' data:  https://www.google-analytics.com/",
          "media-src": "'self' data:",
        },
      },
    },
  ],
};

export default config;
