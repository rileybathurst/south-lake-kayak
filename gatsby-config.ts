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
    title: `South Lake Tahoe Kayak and Paddleboard`,
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
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-import`),
          require("autoprefixer"),
          require("postcss-nested"),
        ],
      },
    },
  ],
};

export default config;
