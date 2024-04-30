import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function DangerSVG({ svg }: { svg: string }) {

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="svg"
    />
  )
}

function AllLocations() {

  const { allStrapiLocation } = useStaticQuery(graphql`
    query allStrapiAllLocation {
      allStrapiLocation(filter: {locale: {slug: {eq: "south-lake"}}}) {
        nodes {
          id
          name
          svg
          description {
            data {
              description
            }
          }
        }
      }
    }
  `);

  return (
    <section className="location-stack">
      {allStrapiLocation.nodes.map((location) => (
        <Link
          key={location.id}
          // to={`/${location.locale.slug}/${location.name}`}
          className="location"
        >
          <DangerSVG svg={location.svg} />
          <div>
            {location.name}
          </div>
          <div>
            < ReactMarkdown
              children={location.description.data.description}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </Link>
      ))}
    </section>
  )
}

export default AllLocations
