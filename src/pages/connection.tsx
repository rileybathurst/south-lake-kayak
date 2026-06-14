import * as React from "react"
import { graphql } from "gatsby"
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";
import Hero from "../components/hero";
import ReferralLink from "../components/referral-link";

export const query = graphql`
  query ConnectionQuery {
    allStrapiConnection {
      nodes {
        name
        excerpt
        link
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      name
    }
  }
`;

type ConnectionTypes = {
  data: {
    allStrapiConnection: {
      nodes: {
        name: string;
        excerpt: string;
        slug: string;
        link: string;

        hero?: PaddleGatsbyImageType
      }[];
    };
    strapiBranch: {
      name: string;
    };
  };
};


const ConnectionPage = ({ data }: ConnectionTypes) => {

  return (
    <React.Fragment>
      <Header />

      {data.allStrapiConnection.nodes.map((connection) => (
        connection?.hero &&
        <>
          <ReferralLink link={connection.link}>
            {/* // TODO: link should have an visual representation */}
            <Hero
              image={connection.hero}
            />
          </ReferralLink>

          <article className="condor">
            <h5>{data.strapiBranch.name} Kayak and Paddleboard Recommends</h5>
            <h1>
              <ReferralLink link={connection.link}>
                {connection.name}
              </ReferralLink>
            </h1>
            <p>{connection.excerpt}</p>
            <ReferralLink link={connection.link}>
              {connection.link}
            </ReferralLink>
            <hr />

          </article>
        </>
      ))}

      <Footer />
    </React.Fragment>
  );
};

export default ConnectionPage;

export const Head = ({ data }: ConnectionTypes) => {

  return (
    <SEO
      title="Connection"
      description={`${data.strapiBranch.name} Kayak and Paddleboard recommends`}
    />
  )
}