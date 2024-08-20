import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { GatsbyImage } from "gatsby-plugin-image";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

export const { strapiTeam } = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug },
      locales: {elemMatch: {slug: {eq: "south-lake"}}}
      ) {
      id
      name
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

const TeamView = ({ data }) => {

  return (
    <>
      <Header />

      <main className="condor">
        {data.strapiTeam.profile ? <GatsbyImage
          image={data.strapiTeam.profile.localFile.childImageSharp.gatsbyImageData}
          alt={data.strapiTeam.profile.alternativeText}
          className="img__wrapped"
        /> : null}

        <h1>{data.strapiTeam.name}</h1>
        {data.strapiTeam.bio ? <ReactMarkdown className='react-markdown'>{data.strapiTeam.bio.data.bio}</ReactMarkdown> : null}
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTeam.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </>
  );
};

export default TeamView;
