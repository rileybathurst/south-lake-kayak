import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';
import { type IGatsbyImageData } from 'gatsby-plugin-image';

import { SEO } from "../../components/seo"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'
import { TeamCards } from "../../components/team-cards";

const TeamPage = () => {

  const data = useStaticQuery(graphql`
    query TeamQuery {
      allStrapiTeam(filter: {branches: {elemMatch: {slug: {eq: "south-tahoe"}}}}) {
        nodes {
          id
          title: name
          link: slug
          excerpt

          image: profile {
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
        name
      }
    }
  `)

  type teamTypes = {
    id: string,
    name: string,
    slug: string,
    bio: {
      data: {
        bio: string
      }
    }
    profile: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      alternativeText: string
    }
  }

  return (
    <React.Fragment>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        <p>Meet the team at {data.strapiBranch.name} Kayak & Paddleboard</p>

        {/* // * custom */}
        <ul>
          <li><a href="#guides">Guides</a></li>
          <li><a href="#shop-dogs">Shop Dogs</a></li>
        </ul>

        <hr />
      </main>

      <TeamCards />

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Team</Breadcrumb>
      </Breadcrumbs>

      < Footer />
    </React.Fragment>
  )
}

export default TeamPage

export const Head = () => {
  return (
    <SEO
      title='Team'
      // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
      breadcrumbs={[
        { name: 'About', item: 'about' },
        { name: 'Team', item: 'about/team' }
      ]}
    />
  )
}
