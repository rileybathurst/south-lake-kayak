import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { SEO } from "../../components/seo";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

import Header from "../../components/header";
import Footer from "../../components/footer";

import { PaddleCompare } from "@rileybathurst/paddle";

const ComparePage = () => {
  const data = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(
      filter: {branch: {slug: {eq: "south-tahoe"}}}
      sort: {order: ASC}
      ) {
      nodes {
        ...CardTourFragment
        slug
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
        fitness
        start
        sport
        price
        name
        minimum
        finish
        duration
      }
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      ...BookNowFragment
    }
  }
`)

  return (
    <React.Fragment>
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
    </React.Fragment>
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
