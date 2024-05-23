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

function Location({ location }: { location: any }) {
  if (location.link === "https://") {
    return (
      <a href={location.link}
        key={location.id}
        className="location"
      >
        <DangerSVG svg={location.svg} />
        <div>
          {location.name}
        </div>
        <div>
          <ReactMarkdown
            children={location.description.data.description}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </a>
    )
  }
  return (
    <Link
      key={location.id}
      to={`/${location.link}`}
      className="location"
    >
      <DangerSVG svg={location.svg} />
      <div>
        {location.name}
      </div>
      <div>
        <ReactMarkdown
          children={location.description.data.description}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </Link>
  )

}

function AllLocations() {

  const { allStrapiLocation } = useStaticQuery(graphql`
    query allStrapiAllLocation {
      allStrapiLocation(filter: {locale: {slug: {eq: "south-lake"}}}) {
        nodes {
          id
          name
          link
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
        <Location location={location} />
      ))}
    </section>
  )
}

export default AllLocations
