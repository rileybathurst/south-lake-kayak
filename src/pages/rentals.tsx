import * as React from "react"
import { graphql, Link, useStaticQuery } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";

import BookNow from "../components/book-now";
import Hero from "../components/hero";
import Locales from "../components/locales";

type RentalsPageTypes = {
  data: {
    strapiBranch: {
      rental_excerpt: string;
      rental: {
        data: {
          rental: string;
        };
      };
      peek_membership: string;
    };
    strapiMembership: {
      title: string;
      excerpt: string;
    };
  };
};

const RentalsPage = ({ data }: RentalsPageTypes) => {

  return (
    <>
      <Header />

      <Hero
        overlay={
          <Locales
            water={true}
            parking={true}
          />
        }
      />
      <main>
        <h1>Rentals</h1>

        <div className="react-markdown">
          <Markdown>{data.strapiBranch.rental.data.rental}</Markdown>
        </div>

        <p>
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>
        </p>

        {/* // * the book now button wants to get inline with the link */}
        <br />

        <BookNow />

        {/* // TODO: where is the br? build it out in storybook */}
        <br />
        <h3>{data.strapiMembership.title}</h3>
        <p>{data.strapiMembership.excerpt}</p>

        <BookNow
          specificName="Membership"
          specificLink={data.strapiBranch.peek_membership}
        />

      </main >
      <Footer topHR />
    </>
  )
}

export default RentalsPage

export const Head = ({ data }: RentalsPageTypes) => {

  return (
    <SEO
      title='Rentals'
      description={data.strapiBranch.rental_excerpt}
    />
  )
}

export const data = graphql`
  query {
    strapiBranch(slug: {eq: "south-tahoe"}) {
      rental_excerpt
      rental {
          data {
            rental
          }
        }
        peek_membership
      }

      strapiMembership {
        title
        excerpt
      }
    }
`;