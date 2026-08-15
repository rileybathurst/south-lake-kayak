import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";

const FavoritesPage = ({ data }: { data: any }) => {
  data = useStaticQuery(query);

  type favoriteConnections = {
    id: string;
    name: string;
    excerpt: string;
    website?: string;
  };

  const WebsiteLink = ({ url }: { url: string }) => {
    url = url.includes('http') ? url.replace(/^https?:\/\//, '') : url;
    url = url.includes('www.') ? url.replace(/^www\./, '') : url;

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
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

          {data.allStrapiConnection.nodes.map((connection: favoriteConnections) => (
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

export const Head = (data: any) => {
  data = useStaticQuery(query);
  return (
    <SEO
      title='Favorites'
      description={`Explore some of our favorite things to do off the water in ${data.strapiBranch.name}.`}
    />
  )
}

const query = graphql`
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