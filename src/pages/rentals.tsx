import * as React from "react"
import { graphql, Link, useStaticQuery } from 'gatsby';

import { SEO } from "../components/seo";
import Markdown from "react-markdown";

import Header from "../components/header";
import Footer from "../components/footer";
import Composition from "../components/composition";

import BookNow from "../components/peek/book-now";

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
      <main className="albatross wrap">
        <article>
          <div className="pelican">
            <h1>Rentals</h1>

            <div className="react-markdown">
              <Markdown>{data.strapiBranch.rental.data.rental}</Markdown>
            </div>


            <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

            {/* // * the book now button wants to get inline with the link */}
            <br />

            <BookNow />

            {/* // ! where is the br? build it out in storybook */}
            <br />
            <h3>{data.strapiMembership.title}</h3>
            <p>{data.strapiMembership.excerpt}</p>
            <a href={data.strapiBranch.peek_membership}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              JOIN NOW
            </a>

          </div>
        </article>
        <Composition />
      </main >
      <Footer />
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