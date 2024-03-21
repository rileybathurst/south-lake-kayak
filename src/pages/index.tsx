import React from "react"
import { Link } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { useStrapiSouthLakeTopBar } from "../hooks/use-strapi-south-lake-top-bar";
import Header from "../components/header";

const IndexPage = () => {

  return (
    <>
      <Header />
      <main>
        Test
      </main>
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO
      title={`${useSiteMetadata().title} - ${useStrapiSouthLakeTopBar()}`}
    />
  )
}