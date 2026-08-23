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
    }[]
  },
  strapiBranch: {
    name: string
  }
}

const FavoritesPage = ({ data }: { data: FavoritesPageTypes }) => {

  console.log(data)

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
        <hr />
        <ul className="">

          {data.allStrapiConnection.nodes.map((connection) => (
            <li key={connection.id}>
              <h2>{connection.name}</h2>
              <p>{connection.excerpt}</p>
              {connection.website && <WebsiteLink url={connection.website} />}
              <hr />
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
      }
    }

    strapiBranch(slug: {eq: "south-tahoe"}) {
      name
    }
  }
`