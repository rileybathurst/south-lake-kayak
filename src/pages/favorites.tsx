import * as React from "react"
import { graphql } from 'gatsby';
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";

type FavoritesPageTypes = {
  allStrapiConnection: {
    nodes: {
      id: string,
      name: string,
      excerpt: string,
      website?: string
      recommendation?: {
        reason: string,
        team: {
          name: string,
          slug: string
        }
      }[]
    }[]
  },
  strapiBranch: {
    name: string
  }
}

const FavoritesPage = ({ data }: { data: FavoritesPageTypes }) => {

  const WebsiteLink = ({ url }: { url: string }) => {
    const href = url.includes('http') ? url : `https://${url}`;
    const cleanedUrl = href.replace(/^https?:\/\//, '').replace(/^www\./, '');

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">{cleanedUrl}</a>
    )
  }

  return (
    <React.Fragment>
      <Header />

      <main className="pelican">
        <h1>Favorites</h1>
        <p>Explore some of our favorite things to do off the water in {data.strapiBranch.name}.</p>
        <ul className="panel">

          {/* // TODO: the card hover is an issue but it was used with the layering of links */}
          {data.allStrapiConnection.nodes.map((connection) => (
            <li key={connection.id} className="card">
              <h2>{connection.name}</h2>
              <p>{connection.excerpt}</p>
              {connection.website && <WebsiteLink url={connection.website} />}

              {connection.recommendation && connection.recommendation.length > 0 && (
                <React.Fragment>

                  <h3 style={{ marginBlockEnd: '0' }}>What our team say</h3>
                  {connection.recommendation.map((recommendation) => (
                    <div className="recommendation" key={recommendation.reason}>
                      <hr />
                      <p>"{recommendation.reason}"</p>

                      <p><a href={`/about/team/${recommendation.team.slug}`}>{recommendation.team.name}</a></p>
                    </div>
                  ))}
                </React.Fragment>
              )}

            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </React.Fragment>
  )
}

export default FavoritesPage

export const Head = ({ data }: { data: FavoritesPageTypes }) => {
  return (
    <SEO
      title='Favorites'
      description={`Explore some of our favorite things to do off the water in ${data.strapiBranch.name}.`}
    />
  )
}

export const query = graphql`
  query strapiFavorites {
    allStrapiConnection(
      filter: {
        branches: {elemMatch: {slug: {eq: "south-tahoe"}}},
        favorite: {ne: true}
      }
    ) {
      nodes {
        id
        name
        excerpt
        website

        recommendation {
          reason
          team {
            name
            slug
          }
        }
      }
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      name
    }
  }
`

/* recommendation {
          reason
          team {
            name
          }
        } */