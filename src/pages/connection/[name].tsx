import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";
import { SEO } from "../../components/seo";
import ReactMarkdown from "react-markdown";
import { Breadcrumb, Breadcrumbs } from "react-aria-components";

function ConnectionCatchAll({ params }: { params: { name: string } }) {

  const data = useStaticQuery(graphql`
    query ConnectionCatchAllQuery {
      allStrapiConnection {
        nodes {
          name
          slug
        }
      }

      strapiError {
        ...errorFragment
      }
    }
  `)

  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>
          <Link to="/connection">Connection</Link> / {params.name}</h2>

        <h1>{data.strapiError.title}</h1>
        <ReactMarkdown>
          {data.strapiError.description.data.description}
        </ReactMarkdown>
        <hr />
        <h2>Connections</h2>

        <ul>
          {data.allStrapiConnection.nodes.map((connection: { slug: string, name: string }) => (
            <li key={connection.slug}>
              <Link to={`/connection/${connection.slug}`}>{connection.name}</Link>
            </li>
          ))}
        </ul>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/connection/">Connection</Link></Breadcrumb>
        <Breadcrumb>{params.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer topHR />
    </React.Fragment>
  )
}

export default ConnectionCatchAll

export const Head = () => {
  return <SEO title="Connection 404" />;
};