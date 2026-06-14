import * as React from "react"
import { graphql, Link } from "gatsby"
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";
import Hero from "../../components/hero";
import ReferralLink from "../../components/referral-link";

export const query = graphql`
  query ConnectionPageQuery($slug: String!) {
    strapiConnection(slug: { eq: $slug }) {
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

    strapiBranch(slug: {eq: "south-tahoe"}) {
      name
    }
  }
`;

type ConnectionTypes = {
  data: {
    strapiConnection: {
      name: string;
      excerpt: string;
      slug: string;
      link: string;

      hero?: PaddleGatsbyImageType
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
      {data.strapiConnection?.hero &&
        <ReferralLink link={data.strapiConnection.link}>

          {/* // TODO: link should have an visual representation */}
          <Hero
            image={data.strapiConnection.hero}
          />
        </ReferralLink>
      }
      <main>
        <h5>{data.strapiBranch.name} Kayak and Paddleboard Recommends</h5>
        <h1>{data.strapiConnection.name}</h1>
        <p>{data.strapiConnection.excerpt}</p>
        <ReferralLink link={data.strapiConnection.link}>
          {data.strapiConnection.link}
        </ReferralLink>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/Connection/">Connection</Link></Breadcrumb>
        <Breadcrumb>{data.strapiConnection.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  );
};

export default ConnectionPage;

export const Head = ({ data }: ConnectionTypes) => {

  return (
    <SEO
      title={`${data.strapiBranch.name} Kayak and Paddleboard recommends ${data.strapiConnection.name}`}
      description={data.strapiConnection.excerpt}
      // TODO: image is this setup properly
      breadcrumbs={[
        { name: "Connection", item: "Connection" },
        // { name: data.strapiConnection.name }
      ]}
    />
  )
}