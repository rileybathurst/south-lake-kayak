import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

import Header from "../../components/header";
import Footer from "../../components/footer";

import { PaddleCompare } from "@rileybathurst/paddle";

const ComparePage = () => {

  // ? how close to the card tour fragment can I use on this?
  const data = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(
      filter: {branch: {slug: {eq: "south-tahoe"}}}
      sort: {order: ASC}
      ) {
      nodes {
        id
        fitness
        slug
        start
        sport
        peek
        price
        name
        minimum
        finish
        excerpt
        duration
        ogimage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      ...BookNowFragment
    }
  }
`)

  return (
    <>
      <Header />

      <main className='pelican'>
        <h1>Compare</h1>
        <PaddleCompare
          tours={data.allStrapiTour.nodes}
          breadcrumb="tours-lessons"
          strapiBranchName={data.strapiBranch.name}
          peek_base={data.strapiBranch.peek_base}
        />
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/tours/">Tours</Link></Breadcrumb>
        <Breadcrumb>Compare</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default ComparePage

export const Head = () => {
  return (
    <SEO
      title='Compare Tours'
      // TODO description and image
      breadcrumbs={[
        { name: 'Tours', item: 'tours' },
        { name: 'Compare', item: 'tours/compare' }
      ]}
    />
  )
}
