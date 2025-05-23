import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { SEO } from "../../components/seo"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ReactMarkdown from "react-markdown"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'

const TeamPage = () => {

  const data = useStaticQuery(graphql`
    query TeamQuery {
      allStrapiTeam(filter: {local: {elemMatch: {slug: {eq: "south-lake"}}}}) {
        nodes {
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

      strapiLocale(slug: {eq: "south-lake"}) {
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
    <>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        <p>Meet the team at {data.strapiLocale.name} Kayak & Paddleboard</p>
        <hr />

        {data.allStrapiTeam.nodes.map((team: teamTypes) => (
          <section key={team.id}>
            {/* // TODO: stylize the iamge in Paddle */}
            {team.profile ? <Link to={team.slug}>
              <GatsbyImage
                image={team.profile.localFile.childImageSharp.gatsbyImageData}
                alt={team.profile.alternativeText}
                className="img__wrapped"
              />
            </Link> : null}
            <h2>
              <Link to={team.slug}>
                {team.name}
              </Link>
            </h2>
            {/* // TODO: reviews about person */}
            {team.bio ? <ReactMarkdown className='react-markdown'>{team.bio.data.bio}</ReactMarkdown> : null}
            <hr />
          </section >

        ))}

      </main>
      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Team</Breadcrumb>
      </Breadcrumbs>

      < Footer />
    </>
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
