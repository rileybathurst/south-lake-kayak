import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { SEO } from "../../components/seo"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'

import { PaddleCard, type PaddleCardTypes } from "@rileybathurst/paddle";

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
        <hr />

        <section className="deck">
          {data.allStrapiTeam.nodes.map((team: PaddleCardTypes) => (
            <PaddleCard
              id={team.id}
              key={team.id}
              title={team.title}
              link={`/about/team/${team.link}`}
              image={team.image}
              excerpt={team.excerpt}
            />
          ))}
        </section>

      </main>
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
