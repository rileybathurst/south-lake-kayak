import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'

import Header from "../../../components/header";
import Footer from "../../../components/footer";

function TeamCatchAll({ params }) {

  const { allStrapiTeam } = useStaticQuery(graphql`
    query TeamCatchAllQuery {
      allStrapiTeam(filter: {locales: {elemMatch: {slug: {eq: "south-lake"}}}}) {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="condor">
        <h2>
          <Link to="/about/team">Team</Link> / {params.name}
        </h2>

        {/* // TODO: this should be a component */}
        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>
        <hr />
        <h2 className="kilimanjaro">Check in with another team member</h2>

        <ul>
          {allStrapiTeam.nodes.map((team) => (
            <li key={team.slug}>
              <Link to={`/team/${team.name}`}>{team.slug}</Link>
            </li>
          ))}
        </ul>

      </main>
      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{params.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </>
  )
}

export default TeamCatchAll
