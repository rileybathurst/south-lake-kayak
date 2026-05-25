import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { GatsbyImage } from "gatsby-plugin-image";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { SEO } from "../components/seo";
import Hero from "../components/hero";

type TeamViewTypes = {
  data: {
    strapiTeam: {
      id: string;
      name: string;
      slug: string;
      bio: {
        data: {
          bio: string;
        };
      };
      profile: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
        alternativeText: string;
      };
    };
  };
};

export const data = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug },
      branches: {elemMatch: {slug: {eq: "south-tahoe"}}}
    ) {
      id
      name
      slug
      bio {
        data {
          bio
        }
      }
      profile {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  }
`

const TeamView = ({ data }: TeamViewTypes) => {

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiTeam.profile}
      />

      <main className="condor">

        <h1>{data.strapiTeam.name}</h1>
        {data.strapiTeam.bio ? <div className='react-markdown'><ReactMarkdown>{data.strapiTeam.bio.data.bio}</ReactMarkdown></div> : null}
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTeam.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </React.Fragment>
  );
};

export default TeamView;

export const Head = ({ data }: TeamViewTypes) => {
  return (
    <SEO
      title={data.strapiTeam.name}
      // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Team', item: 'about/team' },
        { name: 'Team Member', item: `about/team/${data.strapiTeam.slug}` }
      ]}
    />
  )
}
