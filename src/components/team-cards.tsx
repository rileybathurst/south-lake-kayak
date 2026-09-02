import React from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { PaddleCard, paddleTeamFunctions, type PaddleTeamCardTypes } from "@rileybathurst/paddle";

export const TeamCards = () => {
  const data = useStaticQuery(graphql`
    query TeamCardQuery {
      allStrapiTeam {
        nodes {
          ...TeamCardFragment
        }
      }

      strapiExperience {
        guides {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `)

  // ? why am I doing this with a filter here instead of in the query?
  const filteredTeam = data.allStrapiTeam.nodes.filter(
    (team: PaddleTeamCardTypes) =>
      !team.branches?.length || team.branches.some((branch) => branch?.slug === "tahoe-city")
  )

  paddleTeamFunctions(data.strapiExperience.guides, filteredTeam)

  // console.log("filteredTeam", filteredTeam.map((team: PaddleTeamCardTypes) => team))
  const teamMembers = paddleTeamFunctions(data.strapiExperience.guides, filteredTeam)
  // console.log("team", data.allStrapiTeam.nodes.map((team: PaddleTeamCardTypes) => team))

  const positionSets = [
    {
      name: "Guides",
      order: 1,
      positions: ["guide"],
      members: teamMembers.filter((team: PaddleTeamCardTypes) => team.position?.trim().toLowerCase() === "guide"),
    },
    {
      name: "Shop Dogs",
      order: 2,
      positions: ["shop dog"],
      members: teamMembers.filter((team: PaddleTeamCardTypes) => team.position?.trim().toLowerCase() === "shop dog"),
    },
  ]
    .filter((group) => group.members.length > 0)
    .sort((a, b) => a.order - b.order)

  const otherPositions = (members: PaddleTeamCardTypes[]) => {
    const definedPositions = new Set(
      positionSets.flatMap((group) => group.positions).map((position) => position.trim().toLowerCase())
    )

    return members.filter((team: PaddleTeamCardTypes) => {
      const position = team.position?.trim().toLowerCase()
      if (!position) {
        return false
      }

      return !definedPositions.has(position)
    })
  }

  const ungroupedTeamMembers = otherPositions(teamMembers)

  return (
    <React.Fragment>
      {ungroupedTeamMembers.length > 0 && (
        <section id="ungrouped">
          <div className="deck">
            {ungroupedTeamMembers.map((team: PaddleTeamCardTypes) => (
              <PaddleCard
                key={team.id}
                {...team}
                link={`/about/team/${team.link}`}
              />
            ))}
          </div>
        </section>
      )}

      {positionSets.map((group) => (
        <section key={group.name} id={group.name.toLowerCase().replace(/\s+/g, "-")}>
          <div className="pelican">
            <hr />
            <h3>{group.name}</h3>
          </div>
          <div className="deck">
            {group.members.map((team: PaddleTeamCardTypes) => (
              <PaddleCard
                key={team.id}
                {...team}
                link={`/about/team/${team.link}`}
                imageSlide={team.imageSlide}
              />
            ))}
          </div>
        </section>
      ))
      }
    </React.Fragment >
  )
}